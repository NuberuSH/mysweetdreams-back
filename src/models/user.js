import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
    birthDate: { type: String, require: true },
    //role: {type: String, enum: ["school-admin", "teacher", "student","particular"], require: true},
},
    {
        timestamps: true
    });

export default userSchema