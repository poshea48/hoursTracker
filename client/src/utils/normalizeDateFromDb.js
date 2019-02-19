const normalizeDateFromDb = (date) => {
  return new Date(date.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()
}

export default normalizeDateFromDb;
