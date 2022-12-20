import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface JwtPayload {
  userId: string
}

export const validateAuthUser = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies['x-token'];
  console.log('El token que llega al middleware ', token);
  
  if (!token) {
    res.status(403).json({
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
    

    req.userId = payload.userId;

    console.log('Dentro del middleware el ID', req.userId);
    next();

  } catch (err){
    console.log(err);
    res.status(401).json({
      msg: 'Not valid token'
    });
    return;

  }
  
};