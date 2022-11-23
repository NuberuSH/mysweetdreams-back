import mongoose from 'mongoose'

const MONGO_URL = 'mongodb://127.0.0.1:27017/sd-bd';


const startDatabase = (): void => {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err: Error) => {
        if (err) {
            console.log("Error de conexión con la bd")
        }
        else {
            console.log("Conexión con la bd correcta")
        }
    });
    return;
};



export default startDatabase;