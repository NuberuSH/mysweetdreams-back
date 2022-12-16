import { UserModel } from '../models/user';
import { UserRepository } from '../repository/userRepository';
import { UpdateFilter } from '../controllers/user';

export const addNewUser = async (newUser: any, repository: UserRepository): Promise<UserModel | string> => {

  const isUserExisting = await repository.userExists(newUser.email);

  if (isUserExisting){
    throw new Error('User already exists');
  }

  const createdUser = await repository.addNewUser(newUser);
  return createdUser;
};

export const findAllUsers = async (repository: UserRepository): Promise<UserModel[] | null> => {
  if (!repository){
    throw new Error('Missing parameters');
  }
  const users = await repository.findAllUsers();
  return users;
};

export const findUserById = async (Id: string, repository: UserRepository): Promise<UserModel | null> => {
  if (!Id){
    throw new Error('Id is missing');
  }
  const user = repository.findUserById(Id);
  
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


export const updateUser = async (filter: UpdateFilter, data: any, repository: UserRepository): Promise<UserModel | string> => {
  const updatedUser = await repository.updateUser(filter, data);

  if (data.userId){
    return 'Id can\'t be updated'; 
  }

  if (updatedUser === null){
    return 'User not found';
  } else {    
    return updatedUser;
  }

};
