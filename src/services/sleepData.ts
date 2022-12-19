import { SleepDataModel } from '../models/sleepData';
import { SleepDataRepository } from '../repository/sleepDataRepository';
import { averageSleepHours } from '../scripts/averageSleepHours';
import { Week, getWeek } from '../scripts/getWeek';
import { Month, getMonth } from '../scripts/getMonth';

export const getAllUserData = async (userId: string, repository: SleepDataRepository): Promise<SleepDataModel[] | string> => {
  const data = await repository.getAll(userId);
  if (data.length === 0){
    return 'This user has no registered data, please enter sleep data';
  }
  return data;
};

export const addData = async (userId: string, data: any, repository: SleepDataRepository): Promise<SleepDataModel | null | string> => {
  const day = new Date(data.day);
  if (isNaN(day.getTime())){
    return ('Invalid day, please enter a valid date');
  }

  const start = new Date(data.start);
  if (isNaN(start.getTime())){
    return ('Invalid start day, please enter a valid date');
  }

  const end = new Date(data.end);
  if (isNaN(end.getTime())){
    return ('Invalid end day, please enter a valid date');
  }
  
  if (day.getDate() != start.getDate() || day.getMonth() != start.getMonth() || day.getFullYear() != start.getFullYear()){
    return ('Day and start must have the same year-month-day');
  }

  const diffStartEnd = end.getTime() - start.getTime();

  if (diffStartEnd < 0){
    return ('End should be later than start');
  }

  if (diffStartEnd >= 2 * 24 * 60 * 60 * 1000){
    return ('Start and end can only be 2 day apart');
  }

  const addedData = await repository.addDay(userId, data);
  return addedData;
};

export const getDataByDay = async (userId: string, day: Date, repository: SleepDataRepository): Promise<SleepDataModel[] | string> => {
  const dayDateFormat = new Date(day);
  if (isNaN(dayDateFormat.getTime())){
    return ('Invalid Date, please enter a valid date');
  }
  const data = await repository.getByDay(userId, dayDateFormat);
  if (data.length === 0){
    return 'This user has no registered data for this day, please enter sleep data';
  }
  return data;
};

export const getDataByWeek = async (userId: string, day: Date, repository: SleepDataRepository): Promise<SleepDataModel[] | string> => {
  const dayDateFormat = new Date(day);
  if (isNaN(dayDateFormat.getTime())){
    return ('Invalid Date, please enter a valid date');
  }
  const week: Week = getWeek(day);
  const data = await repository.getByWeek(userId, week);
  if (data.length === 0){
    return 'This user has no registered data for this week, please enter sleep data';
  }
  return data;
};

export const getDataByMonth = async (userId: string, day: Date, repository: SleepDataRepository): Promise<SleepDataModel[] | string> => {
  const dayDateFormat = new Date(day);
  if (isNaN(dayDateFormat.getTime())){
    return ('Invalid Date, please enter a valid date');
  }
  const month: Month = getMonth(day);
  const data = await repository.getByMonth(userId, month);
  if (data.length === 0){
    return 'This user has no registered data for this month, please enter sleep data';
  }
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