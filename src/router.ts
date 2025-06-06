import { Router } from "express";
import { body } from 'express-validator';
import { createAccount, getUser, getUserByUsername, login, searchByUsername, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router();

// Ruta para REGISTRAR NUEVO USUARIO
router.post('/auth/register', 
    body('username').notEmpty().withMessage('El npmbre de usuario no puede estar vacío'),
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isLength({min: 8}).withMessage('Contraseña demasiado corta. Mínimo 8 caracteres.'),
    handleInputErrors,
    createAccount
);

// Ruta para AUTENTICAR A UN USUARIO (LOGIN). DEVUELVE EL TOKEN
router.post('/auth/login',
    body('email').isEmail().withMessage('Email no válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
    handleInputErrors,
    login
);

// Ruta para OBTENER DATOS DEL USUARIO (ACCESO PRIVADO)
// Para ello debe tener un TOKEN VÁLIDO
router.get('/user', authenticate , getUser);

// Ruta para VALIDAR EL TOKEN y OBTENER DATOS DEL USUARIO
// Debe haber algún username (no puede ponerse vacío)
// Debe tener un TOKEN VÁLIDO para CAMBIAR DATOS
router.patch('/user', 
    body('username').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
    handleInputErrors,
    authenticate, 
    updateProfile 
);

// Ruta para SUBIR UNA IMAGEN
// Debe tener un TOKEN VÁLIDO
router.post('/user/image', authenticate, uploadImage);

// Ruta para ACCEDER A LOS DATOS PÚBLICOS DE UN PERFIL
router.get('/:username', getUserByUsername);

// Ruta para COMPROBAR SI UN USERNAME ESTÁ DISPONIBLE
router.post(
    '/search', 
    body('username').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
    searchByUsername
);

export default router;