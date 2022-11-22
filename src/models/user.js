import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
    birthdate: { type: String, require: true },     //Tendria que ser type: Date, hay que ver como trabajar con fechas.
    //role: {type: String, enum: ["user", "admin"]},
    updated: {type: Date, default: Date.now()},
    created: {type: Date, default: Date.now()}, 
});


//Para usar TS hay que crear una interfaz de "UserModel" con los tipos TS del Schema. Por ahora esta en JS para probar.

export const User = mongoose.model('users', userSchema);

