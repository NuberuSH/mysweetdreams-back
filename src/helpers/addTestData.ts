import { UserModel } from '../models/user';
import { UserRepositoryMongo } from '../repository/userRepository';

const userRepository = new UserRepositoryMongo();

const user = {
  name: 'TestUser',
  email: 'example@example.com',
  password: 'Cortocircuito5!',
  birthdate: new Date('1995-04-11')
};

userRepository.addNewUser(user);
