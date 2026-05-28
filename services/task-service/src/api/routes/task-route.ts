import { Router } from "express";
import { createTask, getTasks } from "../controllers/task-controller";

const taskRoutes = Router();

taskRoutes.post("/tasks", createTask);
taskRoutes.get("/tasks", getTasks);

export { taskRoutes };
