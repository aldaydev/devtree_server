import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User";

//Definimos que en el request podrá haber una clave "user" tipada con "IUser"
//IUser es el interface que rige el schema del usuario
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

// Función para autenticar a un usuario comprobando su token
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        const error = new Error('No autorizado');
        res.status(401).json({error: error.message});
        return;
    }

    const token = bearer.split(' ')[1];
    if(!token){
        const error = new Error('No autorizado');
        res.status(401).json({error: error.message});
        return;
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('-password');
            if(!user){
                const error = new Error('El usuairo no existe');
                res.status(404).json({error: error.message});
                return;
            }
            req.user = user;
            next();
        }
        
    } catch (error) {
        res.status(500).json({error: 'Token no válido'});
    }
}