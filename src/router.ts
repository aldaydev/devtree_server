import { Router } from "express";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register', (req, res) => {
    console.log(req);
    res.json({name: req.body.name})
});

export default router;