import React from 'react';

const Chart = ({ children, width, height }) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
  >
    {children}
  </svg>
)

export default Chart
