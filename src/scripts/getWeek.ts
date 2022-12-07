export interface Week {
    startDay: Date,
    endDay: Date
}

export const getWeek = (day: Date): Week => {
  const dateDay = new Date(day);
  const numberOfDays = (dateDay.getDay() + 6) % 7;

  // Restar ese número de días a la fecha dada para obtener la fecha de inicio de la semana
  const startDay = new Date(dateDay.getTime() - numberOfDays * 24 * 60 * 60 * 1000);

  // Sumar seis días a la fecha de inicio de la semana para obtener el ultimo dia de la semana
  const endDay = new Date(startDay.getTime() + 6 * 24 * 60 * 60 * 1000);

  return {
    startDay,
    endDay
  };
};
