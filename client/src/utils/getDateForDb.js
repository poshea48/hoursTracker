const getDateForDb = (dateToday) => {
  const MONTHS = [0, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [month, day, year] = dateToday.split(' ');
  return `${year}-${MONTHS.indexOf(month)}-${day}`
}

export default getDateForDb;
