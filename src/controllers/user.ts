//Controllers -> me dejan los datos bonitos para el servicio
//Services -> COntrolan la logica de la aplicacion

import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserRepositoryMongo } from '../repository/userRepository';
import { addNewUser, findAllUsers, findUserById, deleteUserById, authenticateUser } from '../services/user';

const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}" , habria que poner una interfaz

const emailValidator: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passValidator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const isValidId = (id: string) => {
  return id.length === 24;
};


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
      res.status(200).send('Ok');
    } else {
      res.status(400).send('Invalid user/password');
    }

  } catch (err){
    res.status(500).send(err);
  }
};

//TODO Comprobar que el id sea de 24 caracteres
controller.getUserById = async (req: Request, res: Response): Promise<void> => {
  const userID = req.params.userID;
  if (!isValidId(userID)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const userRepository = new UserRepositoryMongo();
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
      return;
    }
    if (!user.email || !user.password){
      res.status(400).send('Missing parameters');
      return;
    }
    if (!user.email.match(emailValidator)) {
      res.status(400).send('Incorrect user/password');
      return;
    }
    if (!user.password.match(passValidator)) {
      res.status(400).send('Incorrect user/password');
      return;
    }

    const userRepository = new UserRepositoryMongo();
    const addedUser = await addNewUser(user, userRepository);
    if (addedUser === 'User already exists' || addedUser === 'Unexpected error'){
      res.status(401).send(addedUser);
      return;
    }
    res.status(200).json(addedUser);
    return;
  } catch (err) {
    res.status(500).json('Error');
  }
};


//TODO Comprobar que el id sea de 24 caracteres
controller.deleteUserById = async (req: Request, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();
  const userID = req.params.userID;
  if (!isValidId(userID)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const deletedUser = await deleteUserById(userID, userRepository);
    if (deletedUser === 'User to delete not found'){
      res.status(400).send('User doesn\'t exists');
      return;
    }
    res.status(200).send('OK');
    return;
  } catch (err) {
    res.status(500).send('Error deleting');
    return;
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
