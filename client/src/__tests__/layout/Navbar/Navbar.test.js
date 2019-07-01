import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navbar from "../../../components/layout/Navbar/Navbar";
import User from "../../../components/layout/Navbar/userItem/User";
import Brand from "../../../components/layout/Navbar/brand/Brand";

import GuestLinks from "../../../components/layout/Navbar/auth/GuestLinks";
import AuthLinks from "../../../components/layout/Navbar/auth/AuthLinks";
import Toggle from "../../../components/layout/Navbar/toggleScreen/Toggle";
import FlashMessage from "../../../components/layout/FlashMessage";
configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  const auth = {
    user: { name: "paul" },
    isAuthenticated: false
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar auth={auth} />);
  });

  it("should render  <User />", () => {
    expect(wrapper.find(User)).toHaveLength(1);
  });

  it("should render  <Brand />", () => {
    expect(wrapper.find(Brand)).toHaveLength(1);
  });

  it("should render <GuestLinks /> when not Authenticated", () => {
    expect(wrapper.find(GuestLinks)).toHaveLength(1);
  });

  it("should render <AuthLinks /> when not Authenticated", () => {
    auth.isAuthenticated = true;
    wrapper = shallow(<Navbar auth={auth} />);
    expect(wrapper.find(AuthLinks)).toHaveLength(1);
  });

  it("should render <Toggle /> ", () => {
    expect(wrapper.find(Toggle)).toHaveLength(1);
  });

  it("should render <FlashMessage /> ", () => {
    expect(wrapper.find(FlashMessage)).toHaveLength(0);
  });
});
