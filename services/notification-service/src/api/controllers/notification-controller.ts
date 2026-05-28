import { Request, Response } from "express";
import { NotificationDTO } from "../../dto/notification-DTO";
import Notification from "../../infrastructure/database/models/Notification";

export const createNotification = async (req: Request, res: Response) => {
    const { recipientEmail, message, read }: NotificationDTO = req.body;
    const notification = new Notification({ recipientEmail, message, read });
    try {
        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: "Error creating notification", error });
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
};
