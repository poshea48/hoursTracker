import React from "react";
import Bar from "./Bar";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 95%;
  background: #afafac;
  justify-content: center;
  border-radius: 5px;
  box-shadow: -5px 10px 8px rgba(0, 0, 0, 0.42);
`;
const HorizontalLines = styled.div`
  position: absolute;
  width: 95%;
`;
const Line = styled.div`
  width: 100%;
  height: 50px;
  border-top: 1px solid black;
`;

const TopLine = styled(Line)`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const BarsDisplay = ({ data, chartType }) => {
  const renderBars = (data, chartType) => {
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
            scale={getScale(chartType)}
            key={i}
            color={color}
          />
        );
      });
    }
  };

  const getScale = chartType => {
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
  return (
    <Container>
      <HorizontalLines>
        <TopLine />
        <Line />
        <Line />
        <Line />
      </HorizontalLines>
      {renderBars(data, chartType)}
    </Container>
  );
};

export default BarsDisplay;
