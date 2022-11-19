import mongoose from 'mongoose'
import userSchema from './models/user.js'

const MONGO_URL = 'mongodb://127.0.0.1:27017/sd-bd'
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("Error de conexión con la bd")
    }
    else {
        console.log("Conexión con la bd correcta")
    }
})


userSchema.create({
     name: 'Alberto',
    email: 'alberto@hotmail.com',
    password: '123456',
    birthDate: '1972/02/17',
})