import type { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
    const user = new User(req.body);
    await user.save(req.body);

    res.send('Registro creado correctamente');
}