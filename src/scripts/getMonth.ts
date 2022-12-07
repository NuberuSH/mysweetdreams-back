
export interface Month {
    startDay: Date,
    endDay: Date
}

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
  
export const getMonth = (day: Date): Month => {
  const dateDay = new Date(day);
  const year = dateDay.getFullYear();
  const month = dateDay.getMonth();

  const startDay = new Date(`${String(year)}-${String(month + 1)}-01`);

  const numberOfDays = daysInMonth(year, month + 1);
  const endDay = new Date(`${String(year)}-${String(month + 1)}-${String(numberOfDays)}`);

  return {
    startDay,
    endDay
  };
};
