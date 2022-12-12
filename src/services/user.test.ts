import { addNewUser, findAllUsers, findUserById } from './user';

describe('addNewUser', () => {
  it('Should return an error if there are no parameters', async () => {
    await expect(addNewUser(undefined, undefined)).rejects.toThrowError('Missing function parameter');
  });

  it('Should return an error if password parameter for user is missing', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbert@gmai.com',
      birthdate: new Date('1995-04-11')
    };
    const modelCreator = () => true;
    await expect(addNewUser(user, modelCreator)).rejects.toThrowError('Missing required User parameters');
  });

  it('Should return an error if email parameter for user is missing', async () => {
    const user = {
      name: 'Juan Alberto',
      password: '1234',
      birthdate: new Date('1995-04-11')
    };
    const modelCreator = () => true;
    await expect(addNewUser(user, modelCreator)).rejects.toThrowError('Missing required User parameters');
  });

  it('Should return an error if birthdate parameter for user is missing', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbert@gmai.com',
      password: '1234'
    };
    const modelCreator = () => true;
    await expect(addNewUser(user, modelCreator)).rejects.toThrowError('Missing required User parameters');
  });

  it('Should return an error if email doesnt match with the RegExp for validate emails', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbe',
      password: '1234',
      birthdate: new Date('1995-04-11')
    };
    const modelCreator = () => true;
    await expect(addNewUser(user, modelCreator)).rejects.toThrowError('Invalid email');
  });

  it('Should return an error if password doesnt match with the RegExp for validate password', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbe@gmail.com',
      password: '1234',
      birthdate: new Date('1995-04-11')
    };
    const modelCreator = () => true;
    await expect(addNewUser(user, modelCreator)).rejects.toThrowError('Invalid pass');
  });

  it('Should return an error if the user already exists', async () => {
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbe@gmail.com',
      password: 'Cortocircuito6!',
      birthdate: new Date('1995-04-11')
    };
    const modelCreator = () => {
      throw new Error('User already exists');
    };
    await expect(addNewUser(user, modelCreator)).rejects.toThrowError('User already exists');
  });


  it('Create a new user if all the arguments are correct and the user didnt exists', async () =>{
    const user = {
      name: 'Juan Alberto',
      email: 'Juanalbe@gmail.com',
      password: 'Cortocircuito6!',
      birthdate: new Date('1995-04-11')
    };
    const modelCreator = (newUser) => newUser;
    await expect(addNewUser(user, modelCreator)).resolves.toBe(user);

  });

});


describe('findAllUsers', () => {
  it('Should return an error if there are no parameters in the function', () => {
    expect(findAllUsers(undefined)).rejects.toThrowError('Missing parameters');
  });

  it('Should return an error if the funtion fails', () => {
    const getterFunction = () => {
      throw new Error('Error in the getterFunction');
    };
    expect(findAllUsers(getterFunction)).rejects.toThrowError('Error in the getterFunction');
  });

  it('Should return an array of users if the function success', () => {
    const getterFunction = () => {
      return [{ name: 'Eduardo', email: 'edu@gmail.com', pass: '123345' },
        { name: 'Antonio', email: 'Anto@outlook.com', pass: '544312' }];
    };
    expect(findAllUsers(getterFunction)).resolves.toStrictEqual([{ name: 'Eduardo', email: 'edu@gmail.com', pass: '123345' },
      { name: 'Antonio', email: 'Anto@outlook.com', pass: '544312' }]);
  });
});


describe('findUserById', () => {
  it('Should return an error if the Id is missing', async () => {
    expect(findUserById('', undefined)).rejects.toThrowError('Id is missing');
  });
});