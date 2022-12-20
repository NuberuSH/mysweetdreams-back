import { Request, Response } from 'express';
import { PasswordBcrypt } from '../helpers/PasswordBcrypt';
import { UserRepositoryMongo } from '../repository/userRepository';
import { authenticateUser } from '../services/auth';


const controller: any = {};

controller.login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userRepository = new UserRepositoryMongo();
    const passwordHelper = new PasswordBcrypt();
    const authenticatedUser = await authenticateUser(user, userRepository, passwordHelper);
    if (authenticatedUser){
      res.cookie('x-token', authenticatedUser.token, {
        domain: process.env.ALLOW_ORIGIN,
        httpOnly: true,
        signed: true,
        secure: true
      });
      res.status(200).json(authenticatedUser);
    } else {
      res.status(400).send('Invalid user/password');
    }
    
    
  } catch (err){
    res.status(500).send('Server Error');
  }

};

controller.logout = async (req: Request, res: Response) => {

  try {
    res.clearCookie('x-token');
    res.status(200).json({
      msg: 'Logout succesfully'
    });
    return;
  } catch (err) {
    res.status(400).json({
      msg: 'Failed logout'
    });
  }
};


export default controller;