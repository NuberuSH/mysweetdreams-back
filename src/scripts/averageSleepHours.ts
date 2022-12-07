import { SleepDataModel } from '../models/sleepData';

export const averageSleepHours = (sleepData: SleepDataModel[]) => { //Deberia se arincrono? Si se salcula la media de un año podria tardar mucho.
  let totalHours = 0;

  sleepData.forEach(dayLog => {
    const diff = (dayLog.end.getTime() - dayLog.start.getTime()) / 3600000; //Como devuelve el valor en milisegundo, hay que dividirlo por el numero de milisegundos que hay en una hora 3600000
    totalHours += diff;
  });

  const averageHours = totalHours / sleepData.length;
  return averageHours;
};

