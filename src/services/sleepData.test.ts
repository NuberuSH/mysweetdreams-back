import { SleepDataModel } from '../models/sleepData';
import { SleepDataRepository } from '../repository/sleepDataRepository';
import { getMonth, Month } from '../scripts/getMonth';
import { getWeek } from '../scripts/getWeek';
import { addData, getAllUserData, getDataByDay, getDataByMonth, getDataByWeek } from './sleepData';


class SleepDataRepositoryMocked implements SleepDataRepository {

  public getAll(): any {
    return [];
  }

  public addDay(): any {
    return null;
  }

  public getByDay(): any {
    return [];
  }

  public getByWeek(): any {
    return [];
  }

  public getByMonth(): any {
    return [];
  }

  public deleteByUserId(): any {
    return [];
  }
}

const sleepDataRepository = new SleepDataRepositoryMocked();
const userId = 'djfe4est56ytde23rfdws4t';

// const userSleepData = {
//   day: new Date('2022-12-30'),
//   start: new Date(2022, 12, 30, 22, 30),
//   end: new Date(2022, 12, 31, 8, 25),
//   mark: 8,
//   timesAwakened: 1,
//   restfullSleep: true,
//   notes: 'Nice'
// };

const userSleepData = {
  day: '2022-11-20',
  start: '2022-11-20T01:00:00Z',
  end: '2022-11-21T23:00:00Z',
  mark: 8,
  timesAwakened: 1,
  restfullSleep: true,
  notes: 'Nice'
};

const userSleepDataArr = [
  {
    day: '2022-11-20',
    start: '2022-11-20T01:00:00Z',
    end: '2022-11-21T23:00:00Z',
    mark: 8,
    timesAwakened: 1,
    restfullSleep: true,
    notes: 'Nice'
  },
  {
    day: '2022-11-21',
    start: '2022-11-21T22:00:00Z',
    end: '2022-11-22T08:00:00Z',
    mark: 4,
    timesAwakened: 2,
    restfullSleep: false,
    notes: 'Bad'
  },
  {
    day: '2022-11-22',
    start: '2022-11-22T23:30:00Z',
    end: '2022-11-23T10:24:00Z',
    mark: 9,
    timesAwakened: 0,
    restfullSleep: true,
    notes: 'fantastic'
  },
  {
    day: '2022-09-22',
    start: '2022-09-22T21:10:00Z',
    end: '2022-09-23T07:15:00Z',
    mark: 10,
    timesAwakened: 0,
    restfullSleep: true,
    notes: 'perfect'
  }
];

describe('getAllUserData', () => {

  it('Should return "This user has no registered data, please enter sleep data"', async () => {
    await expect(getAllUserData(userId, sleepDataRepository)).resolves.toBe('This user has no registered data, please enter sleep data');
  });

  it('Should return an array of sleepData', async ()=> {
    sleepDataRepository.getAll = jest.fn().mockResolvedValue([userSleepData]);
    await expect(getAllUserData(userId, sleepDataRepository)).resolves.toEqual([userSleepData]);
  });

});

describe('addData', () => { 

  it('Sould return the sleepData added', async () =>{
    sleepDataRepository.addDay = jest.fn().mockResolvedValue(userSleepData);
    await expect(addData(userId, userSleepData, sleepDataRepository)).resolves.toBe(userSleepData);
  });

  it('Should return "Invalid day, please enter a valid date" if the data has a wrong value', async () =>{
    userSleepData.day = '2022-50-60';
    expect(addData(userId, userSleepData, sleepDataRepository)).resolves.toBe('Invalid day, please enter a valid date');
  });

  it('Should return "Invalid start day, please enter a valid date" if the data has a wrong value', async () =>{
    userSleepData.day = '2022-11-20';
    userSleepData.start = '2022-50-60';
    expect(addData(userId, userSleepData, sleepDataRepository)).resolves.toBe('Invalid start day, please enter a valid date');
  });

  it('Should return "Invalid end day, please enter a valid date" if the data has a wrong value', async () =>{
    userSleepData.start = '2022-11-20';
    userSleepData.end = '2022-50-60';
    expect(addData(userId, userSleepData, sleepDataRepository)).resolves.toBe('Invalid end day, please enter a valid date');
  });

  it('Should return "Day and start must have the same year-month-day"', () => {
    const sleepData = {
      day: '2022-11-20',
      start: '2022-11-21T22:00:00Z',
      end: '2022-11-22T08:00:00Z',
      mark: 8,
      timesAwakened: 1,
      restfullSleep: true,
      notes: 'Nice'
    };
    expect(addData(userId, sleepData, sleepDataRepository)).resolves.toBe('Day and start must have the same year-month-day');
  });

  it('Should return "Start and end can only be 2 day apart"', () => {
    const sleepData = {
      day: '2022-11-21',
      start: '2022-11-21T22:00:00Z',
      end: '2022-11-25T08:00:00Z',
      mark: 8,
      timesAwakened: 1,
      restfullSleep: true,
      notes: 'Nice'
    };
    expect(addData(userId, sleepData, sleepDataRepository)).resolves.toBe('Start and end can only be 2 day apart');
  });

  it('Should return "End should be later than start"', () => {
    const sleepData = {
      day: '2022-11-21',
      start: '2022-11-21T22:00:00Z',
      end: '2022-11-19T08:00:00Z',
      mark: 8,
      timesAwakened: 1,
      restfullSleep: true,
      notes: 'Nice'
    };
    expect(addData(userId, sleepData, sleepDataRepository)).resolves.toBe('End should be later than start');
  });

});

describe('getDataByDay', () => {

  it('Should return "This user has no registered data for this day, please enter sleep data"', async () => {
    sleepDataRepository.getByDay = jest.fn().mockResolvedValue([]);
    await expect(getDataByDay(userId, new Date('2022-11-20'), sleepDataRepository)).resolves.toBe('This user has no registered data for this day, please enter sleep data');
  });

  it('Should return all the userSleepData in one day', async () => {
    const day = '2022-11-21';
    const sleepDataByDay = userSleepDataArr.filter(data => data.day === day);
    sleepDataRepository.getByDay = jest.fn().mockResolvedValue(sleepDataByDay);
    await expect(getDataByDay(userId, new Date(day), sleepDataRepository)).resolves.toBe(sleepDataByDay);
  });

  it('Should return "Invalid Date, please enter a valid date" if the data has a wrong value', async () => {
    await expect(getDataByDay(userId, new Date('2022-02-40'), sleepDataRepository)).resolves.toBe('Invalid Date, please enter a valid date');
  });

});

describe('getDataByWeek', () => {

  it('Should return "This user has no registered data for this week, please enter sleep data"', async () => {
    sleepDataRepository.getByWeek = jest.fn().mockResolvedValue([]);
    await expect(getDataByWeek(userId, new Date('2022-11-20'), sleepDataRepository)).resolves.toBe('This user has no registered data for this week, please enter sleep data');
  });

  it('Should return all the userSleepData in one week', async () => {
    const day = '2022-11-21';
    const week = getWeek(new Date(day));

    const sleepDataByWeek = userSleepDataArr.filter(data => {
      const dayDate = new Date(data.day);
      return dayDate.getTime() >= week.startDay.getTime() && dayDate.getTime() <= week.endDay.getTime();
    });
    sleepDataRepository.getByWeek = jest.fn().mockResolvedValue(sleepDataByWeek);
    await expect(getDataByWeek(userId, new Date(day), sleepDataRepository)).resolves.toBe(sleepDataByWeek);
  });

  it('Should return "Invalid Date, please enter a valid date" if the data has a wrong value', async () => {
    await expect(getDataByWeek(userId, new Date('2022-02-40'), sleepDataRepository)).resolves.toBe('Invalid Date, please enter a valid date');
  });

});

describe('getDataByMonth', () => {
  
  it('Should return "This user has no registered data for this month, please enter sleep data"', async () => {
    sleepDataRepository.getByMonth = jest.fn().mockResolvedValue([]);
    await expect(getDataByMonth(userId, new Date('2022-11-20'), sleepDataRepository)).resolves.toBe('This user has no registered data for this month, please enter sleep data');
  });

  it('Should return all the userSleepData in one month', async () => {
    const day = '2022-11-21';
    const month = getMonth(new Date(day));

    const sleepDataByMonth = userSleepDataArr.filter(data => {
      const dayDate = new Date(data.day);
      return dayDate.getTime() >= month.startDay.getTime() && dayDate.getTime() <= month.endDay.getTime();
    });

    sleepDataRepository.getByMonth = jest.fn().mockResolvedValue(sleepDataByMonth);
    await expect(getDataByMonth(userId, new Date(day), sleepDataRepository)).resolves.toBe(sleepDataByMonth);
  });

  it('Should return "Invalid Date, please enter a valid date" if the data has a wrong value', async () => {
    await expect(getDataByMonth(userId, new Date('2022-02-40'), sleepDataRepository)).resolves.toBe('Invalid Date, please enter a valid date');
  });

});