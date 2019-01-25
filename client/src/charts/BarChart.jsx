import React, { Component } from 'react'
import Chart from './Chart';
import Bar from './Bar';

class BarChart extends Component {
  render () {
    const {data} = this.props
    // Width of each bar
    const itemWidth = 20

    // Distanct between each bar
    const itemMargin = 5

    const dataLength = data.length

    // Normalize data, reduce to 25% of original value
    const massagedData = data.map(datum =>
      // {...datum, hours: datum.hours * 0.25 }
      Object.assign({}, datum, { hours: datum.hours * 1.25})
    )

    const mostHours = massagedData.reduce((acc, cur) => {
      const { hours } = cur
      return hours > acc ? hours : acc
    }, 0)

    const chartHeight = mostHours

    return (
      <div className="chart-content">
        <Chart
          width={dataLength * (itemWidth + itemMargin)}
          height={chartHeight}>
          {massagedData.map((datum, i) => {
            const itemHeight = datum.hours
            return (
              <Bar
                key={datum.month}
                x={i * (itemWidth + itemMargin)}
                y={chartHeight - itemHeight}
                width={itemWidth}
                height={datum.hours}
              />
            )
          })}
        </Chart>
      </div>
    )
  }
}

export default BarChart
