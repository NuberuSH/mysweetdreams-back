import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_KEY = process.env.SECRET_OR_PRIVATE_KEY || undefined;


export const generateJWT = (userId: string) => {

  return new Promise((resolve: any, reject: any) => {
    if (!JWT_KEY){
      throw new Error('Missing KEY');
    }
    const payload = { userId };
    
    jwt.sign(payload, JWT_KEY, {
      expiresIn: '5h'
    }, (err, token) => {

      if (err){
        console.log(err);
        reject('Error generating JWT');
      } else {
        resolve(token);
      }


    });
  });
};