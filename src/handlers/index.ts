import type { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
    
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
    
}