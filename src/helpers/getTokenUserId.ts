import * as jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string
}

export const getTokenUserId = (token: string) => {
  const secretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY;
  if (!secretOrPrivateKey){
    return null;
  }
  const payload = jwt.verify(token, secretOrPrivateKey) as JwtPayload;
  return payload.userId;
};