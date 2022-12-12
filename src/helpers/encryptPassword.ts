import bcrypt from 'bcryptjs';

const SALT_SEED = parseInt(process.env.SALT_SEED || '12') ; 

const salt = bcrypt.genSaltSync(SALT_SEED);

export const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

