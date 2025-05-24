import { Router } from "express";
import { body } from 'express-validator';
import { createAccount } from "./handlers";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register', 
    body('handle').notEmpty().withMessage('El handler no puede estar vacío'),
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isLength({min: 8}).withMessage('Contraseña demasiado corta. Mínimo 8 caracteres.'),
    createAccount
);

export default router;