import jwt, {JwtPayload} from "jsonwebtoken";

// Generación de un token de autenticación
export const generateJWT = (payload : JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })

    return token;
}