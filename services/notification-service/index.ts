import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import connectDB from "./src/infrastructure/database/mongo";
import { notificationRoutes } from "./src/api/routes/notification-route";
import { initializeTaskCreatedConsumer } from "./src/infrastructure/messaging/rabbit";

const PORT = 8002;
const app = express();
app.use(bodyParser.json());
app.use(notificationRoutes);

const start = async () => {
    await connectDB();
    await initializeTaskCreatedConsumer();

    app.get("/", (req, res) => {
        res.send("notification service running");
    });

    app.listen(PORT, () => {
        console.log(`Notification service running on port ${PORT}`);
    });
};

start().catch((error) => {
    console.error("Failed to start notification service", error);
    process.exit(1);
});
