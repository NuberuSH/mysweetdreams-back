import express from "express";
import usersRoutes from "./src/routes/user"
import cors from "cors";
import startDatabase from "./src/connection.js";


const allowList = ["https://mysweetdreams.es", "https://app.mysweetdreams.es"];

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


const app = express();
const configureExpress = async () => {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/users", usersRoutes);
};



const startAplication = async () => {
    await startDatabase();
    await configureExpress();
    app.listen(3000, () => {
        console.log("Conectado en el puerto 3000");
    });
};

startAplication();


