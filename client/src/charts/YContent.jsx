import React, { Component } from 'react'

class YContent extends Component {
  getYlabels = (chartType) => {
    let nums;
    if (chartType === 'daily') {
      nums = [12, 9, 6, 3]
    } else if (chartType === 'weekly') {
      nums = [60, 45, 30, 15]
    } else {
      nums = [200, 150, 100, 50]
    }

    return nums.map((increment, i) => (
      <span key={i} className="increment">{increment}</span>
    ))
  }
  render () {
    const { chartType } = this.props
    return (
      <div className="y-content">
        {this.getYlabels(chartType)}
      </div>
    )
  }

}

export default YContent
