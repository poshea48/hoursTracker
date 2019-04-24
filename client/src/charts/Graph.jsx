import React, { PureComponent } from "react";
import "../css/Graph.css";
import Bar from "./Bar";
import XContent from "./XContent";
import YContent from "./YContent";
import Spinner from "../common/Spinner";
import isEmpty from "../validation/is-empty";

class Graph extends PureComponent {
  renderBars = (data, chartType) => {
    let size = data.length - 1;
    if (isEmpty(data)) {
      return <Spinner />;
    } else {
      return data.map((datum, i, self) => {
        let color;
        if (i === size && chartType === "daily") {
          color = "#06db6d";
          // datum.hours = hoursToday
        } else if (i === size) {
          color = "#06db6d";
        } else {
          color = "#582a75";
        }

        return (
          <Bar
            bottom={i * 10}
            height={datum.hours}
            scale={this.getScale(chartType)}
            key={i}
            color={color}
          />
        );
      });
    }
  };

  getScale = chartType => {
    let scale;
    if (chartType === "daily") {
      scale = 16.66666667;
    } else if (chartType === "weekly") {
      scale = 3.33333333;
    } else {
      scale = 1;
    }
    return scale;
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextProps.data !== this.props.data ||
  //     nextProps.chartType !== this.props.chartType
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { data, chartType } = this.props;
    console.log("rendering Graph");
    return (
      <div className="graph-wrapper">
        <div className="graph">
          <YContent chartType={chartType} />
          <div className="bar-container">
            <div className="horizontal-lines">
              <div
                className="line"
                style={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px"
                }}
              />
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </div>
            {this.renderBars(data, chartType)}
          </div>
        </div>
        <XContent data={data} chartType={chartType} />
      </div>
    );
  }
}

export default Graph;
