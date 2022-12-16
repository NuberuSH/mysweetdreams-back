import { addNewUser, deleteUserById, findAllUsers, findUserById, updateUser } from './user';
import { UserRepository } from '../repository/userRepository';

class UserRepositoryMocked implements UserRepository {
  public findAllUsers(): any {
    return [];
  }

  public findUserByEmail(): any {
    return null;
  }

  public findUserById(): any {
    return null;
  }

  public addNewUser(): any {
    return null;
  }

  public deleteUserById(): any {
    return null;
  }

  public updateUser(): any {
    return null;
  }

  public userExists(): any {
    return false;
  }

}

const user = {
  name: 'user',
  email: 'example@example.com',
  password: '123456',
  birthdate: '2000-11-20',
  created: '2020-11-11',
  updated: '2021-01-02'
};


describe('findAllUsers', () => {

  it('Should return an empty array if there arent users', async () => {
    const userRepository = new UserRepositoryMocked();
    await expect(findAllUsers(userRepository)).resolves.toEqual([]);
  });

  it('Should return an array of users', async () => {
    const userRepository = new UserRepositoryMocked();
    userRepository.findAllUsers = jest.fn().mockResolvedValue([user]);
    await expect(findAllUsers(userRepository)).resolves.toEqual([user]);
  });

});


describe('findUserById', () => {

  it('Should return an error Id is missing if there is no Id', async () =>{
    const userRepository = new UserRepositoryMocked();
    const id = '';
    await expect(findUserById(id, userRepository)).rejects.toThrowError('Id is missing');
  });

  it('Should return a user', async () => {
    const userRepository = new UserRepositoryMocked();
    const id = 'afkdj2jsla9sldis43udjsne';
    userRepository.findUserById = jest.fn().mockResolvedValue([user]);
    await expect(findUserById(id, userRepository)).resolves.toEqual([user]);
  });

});


describe('deleteUserById', () => {

  it('Should return an error Id is missing if there is no Id', async () =>{
    const userRepository = new UserRepositoryMocked();
    const id = '';
    await expect(deleteUserById(id, userRepository)).rejects.toThrowError('Id is missing');
  });

  it('Should return "User to delete not found" if there isnt a user with this Id in the database', async () => {
    const userRepository = new UserRepositoryMocked();
    const id = 'afkdj2jsla9sldis43udjsne';
    await expect(deleteUserById(id, userRepository)).resolves.toEqual('User to delete not found');
  });

  it('Should return a user', async () => {
    const userRepository = new UserRepositoryMocked();
    const id = 'afkdj2jsla9sldis43udjsne';
    userRepository.deleteUserById = jest.fn().mockResolvedValue(user);
    await expect(deleteUserById(id, userRepository)).resolves.toEqual(user);
  });


});


describe('addNewUser', () => {

  it('Should return an error "User already exist", if the user alreasy exists', async () => {
    const userRepository = new UserRepositoryMocked();
    userRepository.userExists = jest.fn().mockResolvedValue(true);
    await expect(addNewUser(user, userRepository)).rejects.toThrowError('User already exists');
  });

  it('Should return the new user if the user is created', async () => {
    const userRepository = new UserRepositoryMocked();
    userRepository.addNewUser = jest.fn().mockResolvedValue(user);
    await expect(addNewUser(user, userRepository)).resolves.toBe(user);
  });


});

describe('updateUser', () => {

  it('Should return "Id can\'t be updated" if id is in the data to update', async () => {
    const userRepository = new UserRepositoryMocked();
    const filter = {
      _id: 'afkdj2jsla9sldis43udjsne'
    };
    const dataToUpdate = {
      userId: 'ased45gt76896saf34523r2',
      name: 'user',
      birthdate: '2000-11-20'
    };
    await expect(updateUser(filter, dataToUpdate, userRepository)).resolves.toBe("Id can\'t be updated");
  });

  it('Should return "User not found" if there are a user with this Id in the database', async () => {
    const userRepository = new UserRepositoryMocked();
    const filter = {
      _id: 'afkdj2jsla9sldis43udjsne'
    };
    const dataToUpdate = {
      name: 'user',
      birthdate: '2000-11-20'
    };
    await expect(updateUser(filter, dataToUpdate, userRepository)).resolves.toBe('User not found');
  });

  it('Should return the updated user', async () => {
    const userRepository = new UserRepositoryMocked();
    const filter = {
      _id: 'afkdj2jsla9sldis43udjsne'
    };
    const dataToUpdate = {
      name: 'userUpdated',
      birthdate: '1995-11-20'
    };
    const updatedUser = {
      ...user,
      ...dataToUpdate
    };
    console.log(updatedUser);
    userRepository.updateUser = jest.fn().mockResolvedValue(updatedUser);
    await expect(updateUser(filter, dataToUpdate, userRepository)).resolves.toBe(updatedUser);
  });

});