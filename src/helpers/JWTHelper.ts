import { WebToken } from './WebToken';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export class JWTHelper implements WebToken{

  private JWT_KEY: string | undefined;

  constructor() {
    this.JWT_KEY = process.env.SECRET_OR_PRIVATE_KEY;
  }

  public generateJWT(userId: any): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.JWT_KEY){
        throw new Error('Missing KEY');
      }
      const payload = { userId };
        
      jwt.sign(payload, this.JWT_KEY, {
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
  }

  public getJWT(token: string): any | boolean {
 
    if (!this.JWT_KEY){
      res.status(500).json({
        msg: 'Server error'
      });
      return;
    }

    const payload = jwt.verify(token, this.JWT_KEY);
    
    req.userId = payload.userId;
    next();
  }
}