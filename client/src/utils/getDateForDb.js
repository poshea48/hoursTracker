import getTodaysDate from "../utils/getTodaysDate";
const MONTHS = [
  0,
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const getDateForDb = dateToday => {
  if (dateToday === undefined) {
    dateToday = getTodaysDate();
  }

  const [month, day, year] = dateToday.split(" ");
  return `${year}-${MONTHS.indexOf(month)}-${day}`;
};

export default getDateForDb;
