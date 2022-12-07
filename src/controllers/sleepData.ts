import { Request, Response } from 'express';
import { SleepDataRepositoryMongo } from '../repository/sleepDataRepository';
import { addData, getAllUserData, getDataByDay, getDataByWeek, getDataByMonth, getAverageWeekSleepHours, getAverageMonthSleepHours } from '../services/sleepData';
import isValidId from '../scripts/checkId';

const controller: any = {};

controller.getAllUserData = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid User ID');
    return;
  }
  const dataRepository = new SleepDataRepositoryMongo();
  try {
    const data = await getAllUserData(userId, dataRepository);
    res.status(200).json(data);
    return;
  } catch (err){
    res.status(500).send('Error 500');
    return;
  }
};

controller.add = async (req: Request, res: Response) => {
  const dataRepository = new SleepDataRepositoryMongo();
  const data = req.body;
  try {
    const addedData = await addData(data, dataRepository);
    res.status(200).json(addedData);
    return;
  } catch (err) {
    res.status(500).send('Error adding sleep data');
  }
};

controller.getDataByDay = async (req: Request, res: Response) => {
  const dataRepository = new SleepDataRepositoryMongo();
  const { day, userId } = req.body;
  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const data = await getDataByDay(userId, day, dataRepository);
    res.status(200).json(data);
    return;
  } catch (err) {
    res.status(500).send('Error 500');
    return;
  }
};

controller.getDataByWeek = async (req: Request, res: Response) => {
  const dataRepository = new SleepDataRepositoryMongo();
  const { userId, day } = req.body;
  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const data = await getDataByWeek(userId, day, dataRepository);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Error 500');
  }
};

controller.getDataByMonth = async (req: Request, res: Response) => {
  const dataRepository = new SleepDataRepositoryMongo();
  const { userId, day } = req.body;
  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }
  try {
    const data = await getDataByMonth(userId, day, dataRepository);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Error 500');
  }
};


controller.getAverageWeekSleepHours = async (req: Request, res: Response) => {
  const dataRepository = new SleepDataRepositoryMongo();
  const { userId, day } = req.body;
  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }

  try {
    const averageHours = await getAverageWeekSleepHours(userId, day, dataRepository);
    res.status(200).send(String(averageHours));
    return;
  } catch (err) {
    res.status(500).send('Error 500');
  }
};


controller.getAverageMonthSleepHours = async (req: Request, res: Response) => {
  const dataRepository = new SleepDataRepositoryMongo();
  const { userId, day } = req.body;
  if (!userId || !isValidId(userId)){
    res.status(400).send('Invalid user ID');
    return;
  }

  try {
    const averageHours = await getAverageMonthSleepHours(userId, day, dataRepository);
    res.status(200).send(String(averageHours));
    return;
  } catch (err) {
    res.status(500).send('Error 500');
  }
};


export default controller;