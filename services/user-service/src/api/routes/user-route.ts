import { Router } from "express";
import { createUser, getUsers } from "../controllers/user-controller";

const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", getUsers);

export { userRoutes };