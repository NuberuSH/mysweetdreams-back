import { authenticateUser } from './auth';
import { UserRepository } from '../repository/userRepository';
import { PasswordFake } from '../helpers/PasswordFake';


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
  _id: '68795ioyt04urjf73ue85irt',
  name: 'user',
  email: 'example@example.com',
  password: '123456',
  birthdate: '2000-11-20',
  created: '2020-11-11',
  updated: '2021-01-02'
};

const userRepository = new UserRepositoryMocked();
const passwordHelperFake = new PasswordFake();

describe('authenticateUser', () => {

  it('Should return false if the user is not registered', async () => {
    const userRepository = new UserRepositoryMocked();
    await expect(authenticateUser(user, userRepository, passwordHelperFake)).resolves.toBe(false);
  });

  it('Should return false if the passwords doesnt match', async () => {
    const userRepository = new UserRepositoryMocked();
    const registedeUser = {
      _id: '68795ioyt04urjf73ue85irt',
      name: 'user',
      email: 'example@example.com',
      password: '123456',
      birthdate: '2000-11-20',
      created: '2020-11-11',
      updated: '2021-01-02'
    };
    userRepository.findUserByEmail = jest.fn().mockResolvedValue(registedeUser);
    await expect(authenticateUser(user, userRepository, passwordHelperFake)).resolves.toBe(false);
  });

  //TODO The last test, if it goes all right
});