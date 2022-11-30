import { Schema, Document, Model, model } from 'mongoose';

const userSchema: Schema = new Schema({
  name: { 
    type: String
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true 
  }, 
  //role: {type: String, enum: ["user", "admin"]},
  updated: {
    type: Date,
    default: Date.now() 
  },
  created: {
    type: Date,
    default: Date.now() 
  } 
});

export interface UserModel extends Document {
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        updated: Date,
        created: Date
}


export const User: Model<UserModel> = model<UserModel>('users', userSchema); 
