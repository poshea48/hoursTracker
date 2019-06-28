import React from "react";
import { shallow, configure } from "enzyme";
import App from "../App";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("App", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it("renders a div", () => {
    expect(wrapper.find("div").length).toEqual(2);
  });
});
