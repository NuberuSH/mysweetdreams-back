import express from "express";
import usersRoutes from "./src/routes/users.js"
import cors from "cors";
import connectionDatabase from "./src/connection.js";


const app = express();
const allowList = ["https://mysweetdreams.es","https://app.mysweetdreams.es"];

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    methods: "HET,HEAD,PUT,PATCH,POST,DELETE",
    
    credentials: true,

    // exposedHeaders: [

    //     "x-auth-token",
    
    //     "content-type",
    
    //     "X-Requested-With",
    
    //     "Authorization",
    
    //     "Accept",
    
    //     "Origin",
    //   ]
}


app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", usersRoutes);

connectionDatabase.then(() => {

    const port = 3000;
    app.listen(port, () => {
        console.log("Conectado en el puerto 3000");
    });

});

