import { Request, Response } from 'express';
import { UserRepositoryMongo } from '../repository/userRepository';
import { authenticateUser } from '../services/auth';


const controller: any = {};

controller.login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userRepository = new UserRepositoryMongo();
    const authenticatedUser = await authenticateUser(user, userRepository);
    if (authenticatedUser){
      res.status(200).json(authenticatedUser);
    } else {
      res.status(400).send('Invalid user/password');
    }
    
  } catch (err){
    res.status(500).send('Server Error');
  }

};

export default controller;