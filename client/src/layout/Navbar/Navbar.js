import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import NavLink from "./NavLink";
import Hamburger from "./Hamburger";
import ToggleScreen from "./ToggleScreen";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 60px;
  background-color: #343a40;
  color: #fff;
  justify-content: space-between;
`;

const NavItem = styled.div`
  align-self: center;
  margin: 5px 1em;

  @media (max-width: 520px) {
    display: none;
  }
`;

const BrandNav = styled(NavItem)`
  font-family: Monospace;
  font-size: 1.5em;
  @media (max-width: 520px) {
    display: flex;
  }

  @media (max-width: 375px) {
    display: flex;
    font-size: 1em;
  }
`;

const HamburgerNavItem = styled(NavItem)`
  display: none;
  @media (max-width: 520px) {
    display: flex;
    flex-direction: column;
  }
`;

const Navbar = props => {
  const [isToggleOn, setToggle] = useState(false);

  const toggle = () => {
    const toggleScreen = document.getElementById("toggleList");
    if (isToggleOn) {
      toggleScreen.style.display = "none";
    } else {
      toggleScreen.style.display = "block";
    }
    setToggle(!isToggleOn);
  };

  const { onLogoutClick, auth } = props;
  return (
    <Container>
      <NavItem>
        <h5 style={{ margin: 0 }}>{auth.user.name}</h5>
      </NavItem>
      <BrandNav>
        <NavLink brand to="/dashboard">
          Hours Tracker
        </NavLink>
      </BrandNav>
      <NavItem>
        {auth.isAuthenticated ? (
          <AuthLinks click={onLogoutClick} />
        ) : (
          <GuestLinks />
        )}
      </NavItem>

      <HamburgerNavItem>
        <Hamburger click={toggle} />
        <ToggleScreen auth={auth} onLogoutClick={onLogoutClick} />
      </HamburgerNavItem>
    </Container>
  );
};

// class Navbar extends Component {
//   render() {
//     const { onLogoutClick, auth } = this.props;
//     const authLinks = auth.isAuthenticated ? (
//       <div className="nav-item auth">
//         <ul>
//           <li>
//             <button className="auth-button" onClick={onLogoutClick}>
//               Log Out
//             </button>
//           </li>
//         </ul>
//       </div>
//     ) : (
//       <div className="nav-item auth">
//         <ul>
//           <li>Log In</li>
//           <li>Register</li>
//         </ul>
//       </div>
//     );
//     return (
//       <div className="navbar">
//         <div className="nav-item" />
//         {authLinks}
//       </div>
//     );
//   }
// }

export default Navbar;
