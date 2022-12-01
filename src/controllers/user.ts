//Controllers -> me dejan los datos bonitos para el servicio
//Services -> COntrolan la logica de la aplicacion

import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserRepositoryMongo } from '../repository/userRepository';
import { addNewUser, findAllUsers, findUserById, deleteUserById, authenticateUser } from '../services/user';

const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}" , habria que poner una interfaz

const emailValidator: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passValidator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

controller.getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = new UserRepositoryMongo();
    const users = await findAllUsers(userRepository);
    res.status(200).json(users);
    return;
  } catch (err) {
    res.status(500);
    return;
  }
};

controller.authenticateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = new UserRepositoryMongo();
    const isAutheticated = await authenticateUser(req.body, userRepository);
    if (isAutheticated){
      res.status(200).send('ok');
    } else {
      res.status(400).send('Invalid user/password');
    }

  } catch (err){
    res.status(500).send(err);
  }
};

controller.getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = new UserRepositoryMongo();
    const userID = req.params.userID;
    const user = await findUserById(userID, userRepository);
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error');
  }
};

controller.postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);

    if (!user){
      res.status(400).send('Missing user');
    }
    if (!user.email || !user.password || !user.birthdate){
      res.status(400).send('Missing parameters');
    }
    if (!user.email.match(emailValidator)) {
      res.status(400).send('Incorrect user/password');
    }
    if (!user.password.match(passValidator)) {
      res.status(400).send('Incorrect user/password');
    }

    const userRepository = new UserRepositoryMongo();
    const addedUser = await addNewUser(user, userRepository);
    res.status(200).json(addedUser);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
};


//TODO
controller.deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();
  const userID = req.params.userID;
  try {
    const deletedUser = await deleteUserById(userID, userRepository);
    res.status(200).send('OK');
    return;
  } catch (err) {
    res.status(500).send('Error deleting');
  }
};

//TODO
controller.updateUserById = async (req: Request, res: Response): Promise<void> => {
  const filter = {
    userID: req.params.userID
  };

  const update = {
    name: req.body.name,
    email: req.body.email,
    birthdate: new Date(req.body.birthdate)              
  };

  User.findOneAndUpdate(filter, update, function (err: Error){
    if (err){
      res.status(400).send('error');
    } else {
      res.status(200).send('OK');
    }
  });
};

export default controller;
