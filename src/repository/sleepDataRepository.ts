import { SleepData, SleepDataModel } from '../models/sleepData';
import { Week } from '../scripts/getWeek';
import { Month } from '../scripts/getMonth';


export interface SleepDataRepository {
    getAll(userId: string): Promise<SleepDataModel[]>;
    addDay(userId: string, data: SleepDataModel): Promise<SleepDataModel>;
    getByDay(userId: String, day: Date): Promise<SleepDataModel[]>;
    getByWeek(UserId: String, week: Week): Promise<SleepDataModel[]>;
    getByMonth(userId: String, month: Month): Promise<SleepDataModel[]>;
}

export class SleepDataRepositoryMongo {

  public async getAll(userId: string): Promise<SleepDataModel[]> {
    const data = SleepData.find({ userId });
    return data;
  }

  public async addDay(userId: string, data: SleepDataModel): Promise<SleepDataModel> {
    data.userId = userId;
    const addedData = SleepData.create(data);
    return addedData;
  }

  public async getByDay(userId: String, day: Date): Promise<SleepDataModel[]>{
    const data = await SleepData.find({ userId, day });
    return data;
  }

  public async getByWeek(userId: String, week: Week): Promise<SleepDataModel[]>{
    const data = await SleepData.find({ userId, day: { $gt: week.startDay, $lt: week.endDay } });
    return data;
  }

  public async getByMonth(userId: String, month: Month): Promise<SleepDataModel[]> {
    const data = await SleepData.find({ userId, day: { $gt: month.startDay, $lt: month.endDay } });
    return data;
  }
}