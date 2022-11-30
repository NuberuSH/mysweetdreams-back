import { User, UserModel } from '../models/user';

export class UserRepository{

  public async findAllUsers(): Promise<UserModel[]>{
    return User.find();
  }

  public async addNewUser(user: any): Promise<UserModel>{
    const newUser = new User(user);
    return await newUser.save();
  }
}