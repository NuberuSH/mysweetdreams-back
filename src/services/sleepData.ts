import { SleepDataModel } from '../models/sleepData';
import { SleepDataRepository } from '../repository/sleepDataRepository';
import { averageSleepHours } from '../scripts/averageSleepHours';
import { Week, getWeek } from '../scripts/getWeek';
import { Month, getMonth } from '../scripts/getMonth';

export const getAllUserData = async (userId: string, dataRepositoy: SleepDataRepository): Promise<SleepDataModel[]> => {
  const data = await dataRepositoy.getAll(userId);
  return data;
};

export const addData = async (data: SleepDataModel, repository: SleepDataRepository): Promise<SleepDataModel | null> => {
  const addedData = await repository.addDay(data);
  return addedData;
};

export const getDataByDay = async (userId: string, day: Date, repository: SleepDataRepository): Promise<SleepDataModel[]> => {
  const data = await repository.getByDay(userId, day);
  return data;
};

export const getDataByWeek = async (userId: string, day: Date, repository: SleepDataRepository): Promise<SleepDataModel[]> => {
  const week: Week = getWeek(day);
  const data = await repository.getByWeek(userId, week);
  return data;
};

export const getDataByMonth = async (userId: string, day: Date, repository: SleepDataRepository): Promise<SleepDataModel[]> => {
  const month: Month = getMonth(day);
  const data = await repository.getByMonth(userId, month);
  return data;
};

export const getAverageWeekSleepHours = async (userId: string, day: Date, repository: SleepDataRepository): Promise<number> => {
  const week: Week = getWeek(day);
  const data = await repository.getByWeek(userId, week);
  const averageHours = averageSleepHours(data);
  return averageHours;
};

export const getAverageMonthSleepHours = async (userId: string, day: Date, repository: SleepDataRepository): Promise<number> => {
  const month: Month = getMonth(day);
  const data = await repository.getByMonth(userId, month);
  const averageHours = averageSleepHours(data);
  return averageHours;
};