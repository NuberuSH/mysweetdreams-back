const emailValidator: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passValidator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const addNewUser = async (newUser: any, modelCreator: any) => {

  if (!newUser){
    throw new Error('Missing function parameter');
  }
  if (!newUser.email || !newUser.password || !newUser.birthdate){
    throw new Error('Missing required User parameters');
  }
  if (!newUser.email.match(emailValidator)) {
    throw new Error('Invalid email');
  }
  if (!newUser.password.match(passValidator)) {
    throw new Error('Invalid pass');
  }

  const createdUser = await modelCreator(newUser);
  return createdUser;
};

export const findAllUsers = async (getterFunction: any) => {
  if (!getterFunction){
    throw new Error('Missing parameters');
  }
  const users = await getterFunction();
  return users;
};

export const findUserById = async (Id: String, finderFunction: any) => {
  if (!Id){
    throw new Error('Id is missing');
  }
};