import amqplib, { Channel } from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://localhost";
const EXCHANGE = "task_events";
const ROUTING_KEY = "task.created";
let channel: Channel | null = null;

export const initRabbitMQ = async () => {
  const connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  console.log(`Task service connected to RabbitMQ at ${RABBITMQ_URL}`);
};

export const publishTaskCreated = async (task: Record<string, unknown>) => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }

  const payload = Buffer.from(JSON.stringify(task));
  channel.publish(EXCHANGE, ROUTING_KEY, payload, { persistent: true });
};
