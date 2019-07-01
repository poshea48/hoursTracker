import React from "react";
import { shallow, configure } from "enzyme";
import App from "../App";

describe("App", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a div", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });
});
