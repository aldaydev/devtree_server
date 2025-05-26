import mongoose, { Schema } from "mongoose";

export interface IUser {
    handle: string,
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema({
    handle: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name:{
        type: String,
        require: true,
        trim: true //Eliminará espacios en blanco vacíos al inicio y final
    },
    email:{
        type: String,
        require: true,
        trim: true, //Eliminará espacios en blanco vacíos al inicio y final
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true,
        trim: true //Eliminará espacios en blanco vacíos al inicio y final
    },
})

// Utilizamos la función <Generics> para asociar el interface al schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;