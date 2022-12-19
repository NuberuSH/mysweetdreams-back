import { PasswordHelper } from './PasswordHelper';

export class PasswordFake implements PasswordHelper {
  encryp(unecryptedPassword: string): string {
    return 'ThisIsAnEncryptedPassword';
  }

  compare(unecryptedPassword: string, encryptedPassword: string): boolean {
    return false;
  }
}