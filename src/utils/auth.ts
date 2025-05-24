import bcrypt, { compare } from 'bcrypt';

export const hashPassword = async (password: string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const checkPassword = async (password: string, hash: string) : Promise<boolean> => {
    console.log(password, hash);
    return await bcrypt.compare(password, hash);
}