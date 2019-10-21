import React, { memo } from "react";
import "../../css/Graph.css";
import BarsDisplay from "./BarsDisplay";
import XContent from "./XContent";
import YContent from "./YContent";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const GraphWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const Graph = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 200px;
`;

const DisplayGraph = ({ data, chartType }) => {
  return (
    <Container>
      <GraphWrapper>
        <Graph>
          <YContent chartType={chartType} />
          <BarsDisplay data={data} chartType={chartType} />
        </Graph>
        <XContent data={data} chartType={chartType} />
      </GraphWrapper>
    </Container>
  );
};

export default memo(DisplayGraph);
