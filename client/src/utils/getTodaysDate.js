const getTodaysDate = () => {
  let dateArray = new Date().toDateString().split(" ")
  dateArray.shift();
  return dateArray.join(' ');
}

export default getTodaysDate;
