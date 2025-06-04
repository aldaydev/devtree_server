import type { Request, Response } from "express";
import slug from "slug";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import { v4 as uuid } from 'uuid';
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //Validar si el usuario existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("El usuario ya está registrado");
        }
        //Validar si existe el handle
        const handle = slug(req.body.handle, "");
        const handleExists = await User.findOne({ handle });
        if (handleExists) {
            throw new Error("Nombre de usuario no disponible");
        }
        //Instanciar nuevo usuario referente al schema User
        const user = new User(req.body);
        //Hash del password y actualización en user
        const hash = await hashPassword(password);
        user.password = hash;
        user.handle = handle;
        //Guardar usuario en MongoDB
        await user.save();
        res.status(201).send("Registro creado correctamente");
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //Validar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("El usuario no existe");
        }

        //Validar si el password es correcto
        const isPasswordCorrect = await checkPassword(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Password Incorrecto");
        }

        const token = generateJWT({ id: user._id });

        res.status(200).send(token);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body;
        const handle = slug(req.body.handle, "");
        const handleExists = await User.findOne({ handle });
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error("Nombre de usuario no disponible");
            res.status(400).json({ error: error.message });
            return;
        }

        req.user.description = description;
        req.user.handle = handle;
        req.user.links = links;

        await req.user.save();
        res.send("Perfi actualizado correctamente");
    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
};

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const form = formidable({ multiples: false });
        form.parse(req, (error, fields, files) => {
            cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async function (error, result) {
                if(error){
                    const error = new Error("Hubo un error al subir la imagen");
                    res.status(500).json({ error: error.message });
                    return;
                }

                if(result){
                    req.user.image = result.secure_url;
                    await req.user.save();
                    res.json({image: result.secure_url})
                }
            });
        });
    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
};

export const getUserByHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.params;

        const user = await User.findOne({handle}).select('-_id -__v -email -password');

        if(!user){
            const error = new Error('El usuario no existe');
            res.status(404).json(error.message)
            return
        }else{
            res.status(200).json(user)
        }

    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
}

export const searchByHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.body;

        const userExists = await User.findOne( { handle })

        if(userExists){
            const error = new Error(`${handle} ya está registrado`);
            res.status(409).json({error: error.message});
        }else{
            res.send(`${handle} está disponible`);
        }
        console.log(req.body.handle)
    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
}