import { Request, Response } from "express";
import { TaskDTO } from "../../dto/task-DTO";
import Task from "../../infrastructure/database/models/Task";
import { publishTaskCreated } from "../../infrastructure/messaging/rabbit";

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status }: TaskDTO = req.body;
    const task = new Task({ title, description, status });
    try {
        const savedTask = await task.save();
        await publishTaskCreated({
            id: savedTask._id?.toString(),
            title: savedTask.title,
            description: savedTask.description,
            status: savedTask.status,
            createdAt: savedTask.createdAt,
        });
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task or publishing event", error);
        res.status(500).json({ message: "Error creating task", error });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};
