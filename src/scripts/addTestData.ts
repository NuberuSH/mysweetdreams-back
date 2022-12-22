import { UserRepositoryMongo } from '../repository/userRepository';
import { faker } from '@faker-js/faker';
import startDatabase from '../connection';
import { SleepDataRepositoryMongo } from '../repository/sleepDataRepository';
import { PasswordBcrypt } from '../helpers/PasswordBcrypt';

const user = {
  name: 'userExample',
  lastName: 'Johnson',
  email: 'ExampleData@example.com',
  birthdate: new Date('1995-04-11'),
  password: 'Dani123456!'
};


async function createRandomData(iterations: number, initialDay: Date) {
  const userRepository = new UserRepositoryMongo();
  const sleepDataRepository = new SleepDataRepositoryMongo();
  const passwordBcrypt = new PasswordBcrypt();
  user.password = passwordBcrypt.encryp(user.password);
  const userAdded = await userRepository.addNewUser(user);
  console.log(userAdded);
  const initialDayTimestamp = initialDay.getTime();
  for (let i = 0; i < iterations; i++) {
    const data = {
      //userId: userAdded._id,
      day: new Date(initialDayTimestamp + i * 24 * 60 * 60 * 1000),
      start: faker.date.between(new Date(initialDayTimestamp + i * 24 * 60 * 60 * 1000), new Date(initialDayTimestamp + i * 24 * 60 * 60 * 1000 + 12 * 59 * 59 * 1000)),
      end: faker.date.between(new Date(initialDayTimestamp + i * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000), new Date(initialDayTimestamp + i * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 + 4 * 59 * 59 * 1000)),
      mark: faker.random.numeric(1),
      timesAwakened: faker.random.numeric(1),
      restfulSleep: faker.datatype.boolean(),
      notes: faker.lorem.sentence(5)
    };
    await sleepDataRepository.addDay(userAdded._id, data);
    console.log(data);
  }

}


export const addTestData = async () => {
  //await startDatabase();
  await createRandomData(500, new Date(2020, 2, 4, 1, 0, 0));
};

addTestData();

//createRandomData(40, new Date(2020, 2, 4, 1, 0, 0), 'aqw2we34r5t6y7654323er4');