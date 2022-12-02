import { UserModel } from '../models/user';
import { UserRepository } from '../repository/userRepository';

export const addNewUser = async (newUser: any, repository: UserRepository) => {

  const createdUser = await repository.addNewUser(newUser);
  return createdUser;
  
};

export const findAllUsers = async (repository: UserRepository) => {
  if (!repository){
    throw new Error('Missing parameters');
  }
  const users = await repository.findAllUsers();
  return users;
};

export const findUserById = async (Id: string, repository: UserRepository): Promise<UserModel | null | String> => {
  if (!Id){
    throw new Error('Id is missing');
  }
  const user = repository.findUserById(Id);
  if (!user){
    return 'User not found';
  }
  return user;
};


export const deleteUserById = async (Id: string, repository: UserRepository) => {
  if (!Id){
    throw new Error('Id is missing');
  }
  const deletedUser = await repository.deleteUserById(Id);
  if (!deletedUser){
    return 'User to delete not found';
  } else {
    return deletedUser;
  }
};

export const authenticateUser = async (user: any, repository: UserRepository): Promise<boolean> => {
  const userFound = await repository.findUserByEmail(user.email);
  if (userFound.length === 0){
    return false;
  }
  if (user.password === userFound[0].password){
    return true;
  }
  return false;
};