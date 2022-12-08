//Controllers -> me dejan los datos bonitos para el servicio
//Services -> COntrolan la logica de la aplicacion

import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserRepositoryMongo } from '../repository/userRepository';
import { addNewUser, findAllUsers, findUserById, deleteUserById, authenticateUser, updateUser } from '../services/user';
import bcryptjs from 'bcryptjs';
import isValidId from '../scripts/checkId';

const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}" , habria que poner una interfaz

const emailValidator: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passValidator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;


controller.getAll = async (req: Request, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();
  try {
    const users = await findAllUsers(userRepository);
    res.status(200).json(users);
    return;
  } catch (err) {
    res.status(500);
    return;
  }
};

controller.authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = new UserRepositoryMongo();
    const autheticated = await authenticateUser(req.body, userRepository);
    if (autheticated){
      res.status(200).json(autheticated);
    } else {
      res.status(400).send('Invalid user/password');
    }

  } catch (err){
    res.status(500).send(err);
  }
};

controller.getById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  if (!isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const userRepository = new UserRepositoryMongo();
    const user = await findUserById(userId, userRepository);
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error');
  }
};

controller.add = async (req: Request, res: Response): Promise<void> => {
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

    
    //user.password = await bcryptjs.hash(user.password, 8);

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


controller.deleteById = async (req: Request, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();
  const userId = req.params.userId;
  if (!isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const deletedUser = await deleteUserById(userId, userRepository);
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


export interface UpdateFilter {
  _id: string
}

export interface UpdateData {
  name: string,
  lastName: string,
  profilePic: string,
  birthdate: Date
}

controller.updateById = async (req: Request, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();
  const userId = req.params.userId;
  if (!isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }

  const filter: UpdateFilter = {
    '_id': userId
  };

  const data: UpdateData = {
    name: req.body.name,
    lastName: req.body.lastName,
    profilePic: req.body.profilePic,
    birthdate: new Date(req.body.birthdate)              
  };

  try {
    const updatedUser = await updateUser(filter, data, userRepository);
    
    if (updatedUser == 'User not found') {
      res.status(400).send('User not found');
      return;
    } else {   
      res.status(200).send('Ok');
      return;
    }
  } catch (err) {
    res.status(500).send('Error updating user');
  }
};

export default controller;
