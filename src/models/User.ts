import mongoose, { Schema } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema({
    name:{
        type: String,
        require: true,
        trim: true //Eliminará espacios en blanco vacíos al inicio y final
    },
    email:{
        type: String,
        require: true,
        trim: true, //Eliminará espacios en blanco vacíos al inicio y final
        unique: true
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