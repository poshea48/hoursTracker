import React from 'react'
import ShowHours from './ShowHours'

class Compare extends React.Component {
  render () {
    const { first, second, firstHours, secondHours, maxTime } = this.props
    return (
      <div className="" >
        <div className="row">
          <div className="compare first">
            <ShowHours
              maxTime={maxTime}
              time={firstHours}
              name={first}
              color={"green"}
            />
          </div>
          <div className="compare second">
            <ShowHours
              maxTime={maxTime}
              time={secondHours}
              name={second}
              color={"blue"}
            />
          </div>
        </div>
      </div>
    )

  }
}

export default Compare;
