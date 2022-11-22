import mongoose from 'mongoose'
import { User } from './models/user.js'

const MONGO_URL = 'mongodb://127.0.0.1:27017/sd-bd'

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("Error de conexión con la bd")
    }
    else {
        console.log("Conexión con la bd correcta")
    }
})

function fillDatabaseTest(){
    let user1 = new User({name: "Eduardo",
                        email: "edu123@gmail.com",
                        password: "123456",
                        birthDate: "11/04/1995"});

    user1.save();

    let user2 = new User({name: "Daniel",
                        email: "daniElMacarrilla@gmail.com",
                        password: "123456",
                        birthDate: "06/12/2000"});
    
    user2.save();

        
}
//fillDatabaseTest();

//export default connection