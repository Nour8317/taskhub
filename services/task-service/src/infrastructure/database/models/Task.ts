import mongoose from "mongoose";

interface ITask extends mongoose.Document {
    title: string;
    description: string;
    status?: string;
}

const taskSchema = new mongoose.Schema<ITask>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, default: "pending" },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
