//Controllers -> me dejan los datos bonitos para el servicio
//Services -> COntrolan la logica de la aplicacion

import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserRepositoryMongo } from '../repository/userRepository';
import { addNewUser, findAllUsers, findUserById, deleteUserById, updateUser } from '../services/user';
import isValidId from '../scripts/checkId';
import { filterUserModel } from '../helpers/filterModels';
import { filterUser } from '../helpers/filterUser';
import { generateJWT } from '../helpers/generateJWT';
import { PasswordBcrypt } from '../helpers/PasswordBcrypt';
import { SleepDataRepositoryMongo } from '../repository/sleepDataRepository';


const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}" , habria que poner una interfaz

const emailValidator: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passValidator: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


controller.getAll = async (req: Request, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();
  try {
    const users = await findAllUsers(userRepository);
    const filteredUsers = users?.map((user) =>{
      const filteredUser = filterUser(user, filterUserModel);
      return filteredUser;
      
    });
    res.status(200).json(filteredUsers);
    return;
  } catch (err) {
    res.status(500);
    return;
  }
};


controller.getById = async (req: any, res: Response): Promise<void> => {

  const userId = req.userId;

  if (!userId || !isValidId(userId)){
    console.log('Entra');
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const userRepository = new UserRepositoryMongo();
    const user = await findUserById(userId, userRepository);
    console.log(user);
    if (!user){
      res.status(400).send('User not found');
      return;
    }
    //Filter the user JSON
    const filteredUser = filterUser(user, filterUserModel);

    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).send('Error');
  }
};

controller.add = async (req: Request, res: Response): Promise<void> => {
  const passwordHelper = new PasswordBcrypt();
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

    
    user.password = passwordHelper.encryp(user.password);

    const userRepository = new UserRepositoryMongo();
    const addedUser = await addNewUser(user, userRepository);

    if (addedUser === 'User already exists' || addedUser === 'Unexpected error'){
      res.status(401).send(addedUser);
      return;
    }
    if (typeof(addedUser) == 'object'){
      const filteredUser = filterUser(addedUser, filterUserModel);
      const token = await generateJWT(addedUser._id);
      res.cookie('x-token', token);
      res.status(200).json(filteredUser);
      return;
    }
    res.status(500).json('Error');
    return;
  } catch (err) {
    res.status(500).json('Error');
    return;
  }
};


controller.deleteById = async (req: any, res: Response): Promise<void> => {


  const userId = req.userId;

  const userRepository = new UserRepositoryMongo();
  const sleepDataRepository = new SleepDataRepositoryMongo();

  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const deletedUser = await deleteUserById(userId, userRepository, sleepDataRepository);
    if (deletedUser === 'User to delete not found'){
      res.status(400).send('User doesn\'t exists');
      return;
    }
    //Quitar cookie
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

controller.updateById = async (req: any, res: Response): Promise<void> => {
  const userRepository = new UserRepositoryMongo();

  const userId = req.userId;

  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }

  const filter: UpdateFilter = {
    '_id': userId
  };

  const data = req.body;

  console.log(data);

  try {
    const updatedUser = await updateUser(filter, data, userRepository);
    
    if (updatedUser == 'User not found') {
      res.status(400).send('User not found');
      return;
    } else if (updatedUser == 'Id can\'t be updated'){
      res.status(400).send('Id can\'t be updated');
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
