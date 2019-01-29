const getTodaysDate = () => {
  let dateArray = new Date().toDateString().split(" ")
  dateArray.shift();
  return dateArray.join(' ');
}

export default getTodaysDate;

// new Date("2011-09-24T00:00:00".replace(/-/g, '\/').replace(/T.+/, ''));
