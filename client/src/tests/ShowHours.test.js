import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ShowHours from './ShowHours';

it("expect to render ShowHours component", () => {
  const [time, color, name] = [3600, "red", "Today"]
  expect(shallow(<ShowHours time={time} color={color} name={name} />)).toMatchSnapshot();
})
