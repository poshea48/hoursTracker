import React, { Component } from 'react'
import '../css/XContent.css';

class XContent extends Component {
  getLabels = (data, chartType) => {
    return data.map((datum, i) => {
      return <div key={i} className="period">{this.getLabel(datum.period, chartType)}</div>
    })
  }

  getLabel = (period, chartType) => {
    let label;
    if (chartType === 'daily') {
      label = this.getDayName(period)
    } else if (chartType === 'weekly') {
      label = this.getWeekName(period)
    } else {
      label = this.getMonthName(period)
    }
    return label
  }

  getDayName = (date) => {
    const DAILY = ['Sun', 'Mon', 'Tues', 'Wed', 'Thr', 'Fri', 'Sat']
    let day;
    if (date === 'Today') {
      day = date
    } else {
      day = DAILY[new Date(date).getUTCDay()]
    }
    return day;
  }

  getWeekName = (date) => {
    let startDate = new Date(date)
    let endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 6)
    let monthStart = startDate.getMonth() + 1
    let dayStart = startDate.getDate()
    let monthEnd = endDate.getMonth() + 1
    let dayEnd = endDate.getDate()
    return `${monthStart}/${dayStart} ${monthEnd}/${dayEnd}`
  }

  getMonthName = (date) => {
    const MONTHLY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return MONTHLY[new Date(date).getUTCMonth()]
  }

  render() {
    const { data, chartType } = this.props
    let title;
    if (chartType === 'daily') {
      title = 'Hours this week'
    } else if (chartType === 'weekly') {
      title = 'Last 4 weeks'
    } else {
      title = "Last 6 months"
    }
    return (
      <div className="x-wrapper">
        <div className="x-content" >
          <span className="origin"></span>
          <div className="label-content">
            <div className="periods">
              {this.getLabels(data, chartType)}
            </div>
            <div className="x-title">
              <h4>{title}</h4>
            </div>
          </div>
        </div>
      </div>

    )
  }

}

export default XContent
