import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import connectDB from "./src/infrastructure/database/mongo";
import { taskRoutes } from "./src/api/routes/task-route";

const PORT = 8001;
const app = express();
app.use(bodyParser.json());
connectDB();
app.use(taskRoutes);

app.get("/", (req, res) => {
  res.send("task service running");
});

app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});
