import { addNewUser } from './user';

describe('addNewUser', () => {
  it('Should return an error if there are no parameters', async () => {
    await expect(addNewUser({}, undefined)).rejects.toThrowError('Missing function parameter');
  });

  it('Should return an error if password parameter for user is missing', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbert@gmai.com',
      //password = '1234',
      birthdate: new Date('1995-04-11')
    };
    const createFunction = () => {return true;};
    await expect(addNewUser(user, createFunction())).rejects.toThrowError('Missing required User parameters');
  });

  it('Should return an error if email parameter for user is missing', async () => {
    const user = {
      name: 'Juan Alberto',
      //email: 'Juanalbert@gmai.com',
      password: '1234',
      birthdate: new Date('1995-04-11')
    };
    const createFunction = () => {return true;};
    await expect(addNewUser(user, createFunction())).rejects.toThrowError('Missing required User parameters');
  });

  it('Should return an error if birthdate parameter for user is missing', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbert@gmai.com',
      password: '1234'
      //birthdate: new Date('1995-04-11')
    };
    const createFunction = () => {return true;};
    await expect(addNewUser(user, createFunction())).rejects.toThrowError('Missing required User parameters');
  });

  it('Should return an error if email doesnt match with the RegExp for validate emails', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbe',
      password: '1234',
      birthdate: new Date('1995-04-11')
    };
    const createFunction = () => {return true;};
    await expect(addNewUser(user, createFunction())).rejects.toThrowError('Invalid email');
  });

  it('Should return an error if password doesnt match with the RegExp for validate password', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbe@gmail.com',
      password: '1234',
      birthdate: new Date('1995-04-11')
    };
    const createFunction = () => {return true;};
    await expect(addNewUser(user, createFunction())).rejects.toThrowError('Invalid pass');
  });

  it.todo('Should return an error if the user already exists');
  it.todo('Create a new user if all the arguments are correct and the user didnt exists');

});


