import { User, UserModel } from '../models/user';
import { UpdateFilter } from '../controllers/user';

export interface UserRepository {
  findAllUsers(): Promise<UserModel[]>;
  findUserById(Id: string): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  addNewUser(user: any): Promise<UserModel | string>;
  deleteUserById(Id: string): Promise<UserModel | null>;
  updateUser(filter: UpdateFilter, update: any): Promise<UserModel | null>;
}

export class UserRepositoryMongo implements UserRepository{

  public async findAllUsers(): Promise<UserModel[]>{
    return await User.find();
  }

  public async findUserById(Id: string): Promise<UserModel | null>{
    const user = await User.findById(Id);
    return user;
  }

  public async findUserByEmail(userEmail: string): Promise<UserModel | null>{
    const user = await User.findOne({ email: userEmail });
    return user;
  }

  public async addNewUser(user: any): Promise<UserModel | string>{
    const newUser = new User(user);
    try {
      return await User.create(newUser);
    } catch (err: any){
      if (err.keyPattern.email === 1){
        return 'User already exists';
      }
      return 'Unexpected error';
    }
  }

  public async deleteUserById(Id: string): Promise<UserModel | null>{
    return User.findByIdAndRemove(Id);
  }

  public async updateUser(filter: UpdateFilter, update: any): Promise<UserModel | null>{
    return User.findOneAndUpdate(filter, update, { new: true });   
  }
}