import { Router } from "express";
import { body } from 'express-validator';
import { createAccount, getUser, getUserByHandle, login, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register', 
    body('handle').notEmpty().withMessage('El handler no puede estar vacío'),
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isLength({min: 8}).withMessage('Contraseña demasiado corta. Mínimo 8 caracteres.'),
    handleInputErrors,
    createAccount
);

router.post('/auth/login',
    body('email').isEmail().withMessage('Email no válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
    handleInputErrors,
    login
);

router.get('/user', authenticate , getUser);

router.patch('/user', 
    body('handle').notEmpty().withMessage('El handler no puede estar vacío'),
    body('description').notEmpty().withMessage('La descripción no puede estar vacía'),
    handleInputErrors,
    authenticate, 
    updateProfile 
);

router.post('/user/image', authenticate, uploadImage);

router.get('/:handle', getUserByHandle)

export default router;