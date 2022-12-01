import { User, UserModel } from '../models/user';

export interface UserRepository {
  findAllUsers(): Promise<UserModel[]>;
  findUserById(Id: string): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel[] | void>;
  addNewUser(user: any): Promise<UserModel>;
  deleteUserById(Id: string): Promise<UserModel | null>;
}

export class UserRepositoryMongo implements UserRepository{

  public async findAllUsers(): Promise<UserModel[]>{
    return await User.find();
  }

  public async findUserById(Id: string): Promise<UserModel | null>{
    const user = await User.findById(Id);
    return user;
  }

  public async findUserByEmail(userEmail: string): Promise<UserModel[] | void>{
    const user = await User.find({ email: userEmail });
    return user;
  }

  public async addNewUser(user: any): Promise<UserModel>{
    const newUser = new User(user);
    return await User.create(newUser);
  }

  public async deleteUserById(Id: string): Promise<UserModel | null>{
    return User.findByIdAndRemove(Id);
  }
}