import type { Request, Response } from "express";
import slug from "slug";

import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;
        //Validar si el usuario existe
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error('El usuario ya está registrado');
        }
        //Validar si existe el handle
        const handle = slug(req.body.handle, '');
        const handleExists = await User.findOne({handle});
        if(handleExists){
            throw new Error('Nombre de usuario no disponible');
        }
        //Instanciar nuevo usuario referente al schema User
        const user = new User(req.body);
        //Hash del password y actualización en user
        const hash = await hashPassword(password);
        user.password = hash;
        user.handle = handle;
        //Guardar usuario en MongoDB
        await user.save();
        res.status(201).send('Registro creado correctamente');
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const login = async (req: Request, res: Response) => {
    
    try {

        const { email, password } = req.body;

        //Validar si el usuario existe
        const user = await User.findOne({email});
        if(!user){
            throw new Error('El usuario no existe');
        }

        //Validar si el password es correcto
        const isPasswordCorrect = await checkPassword(password, user.password);
        
        if(!isPasswordCorrect){
            throw new Error('Password Incorrecto');
        }

        const token = generateJWT({id: user._id});

        res.status(200).send(token);

    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
}