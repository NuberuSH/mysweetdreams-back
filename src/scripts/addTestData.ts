import { UserModel } from '../models/user';
import { UserRepositoryMongo } from '../repository/userRepository';

const user = {
  name: 'userExample',
  email: 'exampleAddData@example.com',
  birthdate: new Date('1995-04-11'),
  password: '123456'
};

// export interface SleepDataModel extends Document {
//     userId: string,
//     day: Date,
//     start: Date,
//     end: Date,
//     mark: number,
//     timesAwakened: number,
//     restfulSleep: boolean,
//     notes?: string
// }


function generateData(numberOfdata: number) {

  const userRepository = new UserRepositoryMongo();
  let startDay = new Date('2010-10-02');
  userRepository.addNewUser(user);
  const data = [];
  const userId = userRepository.findUserByEmail(user.email);
  const milisenconsInADay = 24 * 60 * 60 * 1000;
  for (let i = 0; i < numberOfdata; i++) {
    const startDayTimestamp = startDay.getTime() + milisenconsInADay;
    console.log(startDayTimestamp);
    startDay = new Date(startDayTimestamp);
    console.log(startDay);
    
        
  }
}

generateData(50);