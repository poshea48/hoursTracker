const MINUTES_DIVIDER = 60
// const SECONDS_DIVIDER = 60

const convertHoursToTime = (hours) => {
  let hoursNum = Math.floor(hours) || 0
  let minutes = Math.floor(MINUTES_DIVIDER * (hours - hoursNum)) || 0
  // let seconds = Math.floor(SECONDS_DIVIDER * ((MINUTES_DIVIDER * (hours - hoursNum)) - (minutes))) || 0

  return `${String(hoursNum).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export default convertHoursToTime;
