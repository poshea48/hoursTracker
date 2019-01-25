import React, { Component } from 'react'
import '../css/Graph.css';
import YContent from './YContent'
import Bar from './Bar';
import XContent from './XContent';

class Graph extends Component {
  renderBars = (data, chartType) => {
    let size = data.length - 1
    return data.map((datum, i, self) => {
      let color;
      if (i === size ) {
        color = '#06db6d'
      } else {
        color = '#582a75'
      }
      return (
        <Bar
          bottom={i * 10}
          height={datum.hours}
          scale={this.getScale(chartType)}
          key={i}
          color={color}
        />
      )
    })
  }

  getScale = (chartType) => {
    let scale;
    if (chartType === 'daily') {
      scale = 16.66666667
    } else if (chartType === 'weekly') {
      scale = 3.33333333
    } else {
      scale = 1
    }
    return scale
  }

  render () {
    const { data, chartType } = this.props

    return (
      <div className="graph-wrapper">
        <div className="graph">
          <YContent chartType={chartType} />
          <div className="bar-container">
            <div className="horizontal-lines">
              <div className="line" style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            {this.renderBars(data, chartType)}

          </div>
        </div>
        <XContent data={data} chartType={chartType} />
      </div>
    )
  }
}

export default Graph;
