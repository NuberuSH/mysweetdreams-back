import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface JwtPayload {
  userId: string
}

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  console.log('Entra');
  const token = req.cookies['x-token'];
  console.log('AQUIIII');
  console.log(token);

  if (!token) {
    console.log('Sin token');
    res.status(401).json({
      msg: 'Invalid permission'
    });
    return;
  }

  try {

    const secretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY; 
    if (!secretOrPrivateKey){
      res.status(500).json({
        msg: 'Server error'
      });
      return;
    }

    const payload = jwt.verify(token, secretOrPrivateKey) as JwtPayload;
    
    // if (req.body.userId != payload.userId){
    //   res.status(400).json({
    //     msg: 'Invalid user'
    //   });
    // }

    req.body.userId = payload.userId;
    next();

  } catch (err){
    console.log(err);
    res.status(401).json({
      msg: 'Not valid token'
    });
    return;

  }
  
};