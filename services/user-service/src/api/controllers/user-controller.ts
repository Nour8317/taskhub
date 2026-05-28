import { Request, Response } from "express";
import { UserDTO } from "../../dto/user-DTO";
import User from "../../infrastructure/database/models/User";

export const createUser = async (req: Request, res: Response) => {
    const { name, email }: UserDTO = req.body;
    const user = new User({ name, email });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};