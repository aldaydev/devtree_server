import type { Request, Response } from "express";
import slug from "slug";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import { v4 as uuid } from 'uuid';
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

// Controlador para CREAR CUENTA
export const createAccount = async (req: Request, res: Response) => {
    try {
        //Rescatar email y pass de la solicitud
        const { email, password } = req.body;

        //Validar si el email ya está registrado
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("El usuario ya está registrado");
        }

        //Validar si existe el username
        const username = slug(req.body.username, "");
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            throw new Error("Nombre de usuario no disponible");
        }

        //Instanciar nuevo usuario referente al schema User
        const user = new User(req.body);

        //Hash del password y actualización en user
        const hash = await hashPassword(password);
        user.password = hash;
        user.username = username;
        //Guardar usuario en MongoDB
        await user.save();
        res.status(201).send("Registro creado correctamente");
    } catch (error) {
        res.status(400).json(error.message);
    }
};

// Controlador para ACCEDER
export const login = async (req: Request, res: Response) => {
    try {
        //Rescatamos email y pass de la solicitud
        const { email, password } = req.body;

        //Validar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Cuenta o contraseña incorrectas");
        }

        //Validar si el password es correcto
        const isPasswordCorrect = await checkPassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Cuenta o contraseña incorrectas");
        }

        //Generación del token
        const token = generateJWT({ id: user._id });

        res.status(200).send(token);

    } catch (error) {
        res.status(400).json(error.message);
    }
};

// Controlador para OBTENER LOS DATOS DEL USUARIO
export const getUser = async (req: Request, res: Response) => {
    console.log(req.user);
    res.json(req.user);
};

// Controlador para ACTUALIZAR EL PERFIL
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body;
        const username = slug(req.body.username, "");

        //Comprueba si el nombre de usuario existe
        const usernameExists = await User.findOne({ username });
        //Si el nombre de usuario existe y no es el del mismo usuario
        if (usernameExists && usernameExists.email !== req.user.email) {
            const error = new Error("Nombre de usuario no disponible");
            res.status(400).json({ error: error.message });
            return;
        }

        //Cambiamos los datos en req.user
        req.user.description = description;
        req.user.username = username;
        req.user.links = links;

        //Cuardamos los datos
        await req.user.save();

        res.send("Perfi actualizado correctamente");

    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
};

// Controlador para ACTUALIZAR LA CUENTA
export const updateAccount = async (req: Request, res: Response) => {
    try {
        const { password, name } = req.body;
        
        if(password){
            //Hash del password y actualización en user
            const hash = await hashPassword(password);
            req.user.password = hash;
        }

        req.user.name = name;

        //Cuardamos los datos
        await req.user.save();

        res.send("Cuenta actualizada correctamente");

    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
}

// Controlador para ACTUALIZAR LA IMAGEN
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


// Controlador para OBTENER UN USUARIO POR SU USERNAME
export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({username}).select('-_id -__v -email -password');

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

// Controlador para buscar si un USERNAME YA EXISTE
export const searchByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        const userExists = await User.findOne( { username })

        if(userExists){
            const error = new Error(`${username} ya está registrado`);
            res.status(409).json({error: error.message});
        }else{
            res.send(`${username} está disponible`);
        }

    } catch (error) {
        error = new Error("Hubo un error");
        res.status(500).json({ error: error.message });
        return;
    }
}