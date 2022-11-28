
export const addNewUser = async (newUser: any, creatorFunction: any) => {
  const emailValidator: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passValidator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  if (!newUser || !creatorFunction){
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

  const createdUser = await creatorFunction(newUser);
  return createdUser;
};

export const getAllUsers = async (getterFunction: any) => {
  const users = getterFunction();
  return users;
};