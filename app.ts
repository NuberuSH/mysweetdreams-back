import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { errorHandler } from './src/middlewares/errorHandler';
import authRoutes from './src/routes/auth';
import usersRoutes from './src/routes/user';
import sleepDataRoutes from './src/routes/sleepData';
import startDatabase from './src/connection';
import { validateAuthUser } from './src/middlewares/validateAuthUser';

dotenv.config();

const corsOptions: cors.CorsOptions = {
  origin: process.env.ALLOW_ORIGIN,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  credentials: true

  // exposedHeaders: [

  //   'x-token',

  //   'content-type',

  //   'X-Requested-With',

  //   'Authorization',

  //   'Accept',

  //   'Origin'
  // ]
};


const app = express();

const configureExpress = async (): Promise<void> => {
  app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/app.log'), { flags: 'a' })
  }));
  app.use(errorHandler);
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use('/auth', authRoutes);
  app.use('/users', usersRoutes);
  app.use(validateAuthUser);
  app.use('/data', sleepDataRoutes);
  return;
};


const startAplication = async (): Promise<void> => {
  await startDatabase();
  await configureExpress();
  app.listen(process.env.PORT, () => {
    console.log('Conectado en el puerto', process.env.PORT);
  });
  return;
};

startAplication();


