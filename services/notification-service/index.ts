import express from "express";
import bodyParser from "body-parser";
import connectDB from "./src/infrastructure/database/mongo";
import { notificationRoutes } from "./src/api/routes/notification-route";

const PORT = 8002;
const app = express();
app.use(bodyParser.json());

connectDB();
app.use(notificationRoutes);

app.get("/", (req, res) => {
    res.send("notification service running");
});

app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});
