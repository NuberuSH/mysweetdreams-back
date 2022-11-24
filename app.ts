import express from 'express';
import usersRoutes from './src/routes/user.js';
import cors from 'cors';
import startDatabase from './src/connection.js';


const allowList: string[] = ['https://mysweetdreams.es', 'https://app.mysweetdreams.es'];

const corsOptions: cors.CorsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  methods: 'HET,HEAD,PUT,PATCH,POST,DELETE',

  credentials: true

  // exposedHeaders: [

  //     "x-auth-token",

  //     "content-type",

  //     "X-Requested-With",

  //     "Authorization",

  //     "Accept",

  //     "Origin",
  //   ]
};


const app = express();
const configureExpress = async (): Promise<void> => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use('/users', usersRoutes);
  return;
};


const startAplication = async (): Promise<void> => {
  await startDatabase();
  await configureExpress();
  app.listen(3000, () => {
    console.log('Conectado en el puerto 3000');
  });
  return;
};

startAplication();


