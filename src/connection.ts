import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://127.0.0.1:27017/sd-bd';


const startDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Succesfully conected to database');
  } catch (error){
    console.log('Error conecting to database');
  }
};


export default startDatabase;