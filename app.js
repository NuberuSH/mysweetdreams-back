import { express } from "express";
import { cors } from "cors";


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
app.use(routes);


app.listen(3000, () => {
    console.log("Conectado en el puerto 3000");
});
