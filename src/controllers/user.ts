import { Request, Response } from 'express';
import { User } from '../models/user.js';
import { addNewUser } from '../services/user.js';

const controller: any = {}; //He puesto any porque si no me decia que "getUsers property does not exist on type {}"


controller.getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({});
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
  const newUser = new User({ ...req.body });
  try {
    addNewUser(newUser, newUser.save());
    res.status(200).send('OK');
    return;
  } catch (err) {
    res.status(500).send('Error');
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
