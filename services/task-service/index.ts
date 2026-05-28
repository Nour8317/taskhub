import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import connectDB from "./src/infrastructure/database/mongo";
import { taskRoutes } from "./src/api/routes/task-route";
import { initRabbitMQ } from "./src/infrastructure/messaging/rabbit";

const PORT = 8001;
const app = express();
app.use(bodyParser.json());
app.use(taskRoutes);

const start = async () => {
  await connectDB();
  await initRabbitMQ();

  app.get("/", (req, res) => {
    res.send("task service running");
  });

  app.listen(PORT, () => {
    console.log(`Task service running on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error("Failed to start task service", error);
  process.exit(1);
});
