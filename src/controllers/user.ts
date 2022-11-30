import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserRepository } from '../repository/userRepository';
import { addNewUser, findAllUsers, findUserById } from '../services/user';

const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}" , habria que poner una interfaz?


controller.getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('hola');
    const userRepository = new UserRepository();
    const users = await findAllUsers(userRepository);
    //const users = await findAllUsers(User.find) 
    //const users = await User.find();
    res.status(200).json(users);
    return;
  } catch (err) {
    res.status(500);
    return;
  }
};

controller.getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error');
  }
};

controller.postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = new UserRepository();
    const addedUser = await addNewUser(req.body, userRepository);
    //await newUser.save();
    res.status(200).send(addedUser);
    return;
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userID = req.params.userID;
  try {
    await User.findByIdAndRemove(userID);
    res.status(200).send('OK');
    return;
  } catch (err) {
    res.status(500).send('Error deleting');
  }
};

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
