import bcrypt from 'bcrypt';

// Generación de un HASH a partir de la contraseña
export const hashPassword = async (password: string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Comprobación de contraseña comparándola con el HASH guardado
export const checkPassword = async (password: string, hash: string) : Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}