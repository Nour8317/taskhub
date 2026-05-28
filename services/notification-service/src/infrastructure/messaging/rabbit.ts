import amqplib from "amqplib";
import Notification from "../database/models/Notification";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://localhost";
const USER_SERVICE_URL = process.env.USER_SERVICE_URL ?? "http://localhost:8000";
const EXCHANGE = "task_events";
const QUEUE = "task_created_queue";
const ROUTING_KEY = "task.created";

const fetchUsers = async () => {
  const response = await (globalThis as any).fetch(`${USER_SERVICE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users from ${USER_SERVICE_URL}/users: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

const createNotificationsForAllUsers = async (task: { title?: string }) => {
  const users = await fetchUsers();
  if (!Array.isArray(users)) {
    throw new Error("User service returned invalid users list");
  }

  const notifications = users.map((user: any) => ({
    recipientEmail: user.email,
    message: `A new task was created: ${task.title ?? "(no title)"}`,
    read: false,
  }));

  await Notification.insertMany(notifications);
};

export const initializeTaskCreatedConsumer = async () => {
  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

  console.log(`Notification service connected to RabbitMQ at ${RABBITMQ_URL}`);

  await channel.consume(
    QUEUE,
    async (msg) => {
      if (!msg) {
        return;
      }

      try {
        const event = JSON.parse(msg.content.toString());
        console.log("Received task.created event:", event);
        await createNotificationsForAllUsers(event);
        channel.ack(msg);
      } catch (error) {
        console.error("Error processing task.created event", error);
        channel.nack(msg, false, false);
      }
    },
    { noAck: false }
  );
};
