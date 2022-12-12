import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;


const startDatabase = async (): Promise<void> => {
  try {
    if (!MONGO_URL){
      throw new Error('Missing DB URL');
    } else {
      await mongoose.connect(MONGO_URL);
      console.log('Succesfully conected to database');
    }
  } catch (error){
    console.log('Error conecting to database');
  }
};


export default startDatabase;