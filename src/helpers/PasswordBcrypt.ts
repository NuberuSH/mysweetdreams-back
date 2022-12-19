import { PasswordHelper } from './PasswordHelper';
import bcrypt from 'bcryptjs';

export class PasswordBcrypt implements PasswordHelper {
  encryp(unecryptedPassword: string): string {
    const SALT_SEED = parseInt(process.env.SALT_SEED || '12') ; 
    const salt = bcrypt.genSaltSync(SALT_SEED);

    return bcrypt.hashSync(unecryptedPassword, salt);

  }

  compare(unecryptedPassword: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(unecryptedPassword, encryptedPassword);
  }
}