import type { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {

    const { email } = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        const error = new Error('El usuario ya está registrado');
        res.status(400).json({error: error.message});
    }

    const user = new User(req.body);
    await user.save(req.body);

    res.status(201).send('Registro creado correctamente');
}