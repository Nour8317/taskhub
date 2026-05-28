import { Router } from "express";
import { createNotification, getNotifications } from "../controllers/notification-controller";

const notificationRoutes = Router();

notificationRoutes.post("/notifications", createNotification);
notificationRoutes.get("/notifications", getNotifications);

export { notificationRoutes };
