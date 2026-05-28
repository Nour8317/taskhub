import mongoose from "mongoose";

interface INotification extends mongoose.Document {
    recipientEmail: string;
    message: string;
    read: boolean;
}

const notificationSchema = new mongoose.Schema<INotification>(
    {
        recipientEmail: { type: String, required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model<INotification>("Notification", notificationSchema);
export default Notification;
