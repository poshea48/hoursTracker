import React from 'react';
import CircularProgressbar from 'react-circular-progressbar'
import '../css/ShowHours.css';
import convertHoursToTime from '../common/convertHoursToTime';


const ShowHours = ({time, color, name, maxTime}) => {
  let timeString = convertHoursToTime(time)
  let percentage = (time / maxTime) * 100

  return (
    <div className="progress-circular">
      <div style={{height: '50px'}}>
        <h3>{name}</h3>
      </div>
      <CircularProgressbar
        percentage={percentage}
        background
        styles={{
          background: {
            fill: '#afafac' // muted color
          },
          text: {
            fill: '#ddf40e', // yellow/gold color
            fontSize: '14px'
          },
          path: {
            stroke: color
          }
        }}
        text={timeString}
      />
    </div>
  )
}

export default ShowHours;
