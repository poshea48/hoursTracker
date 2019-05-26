import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
  color: rgba(7, 27, 82, 1);

  @media (max-width: 450px) {
    margin-top: 25px;
    margin-bottom: 25px;
  }
`;

const Today = new window.Date().toDateString();

const Header = () => (
  <Container>
    <Title>{Today}</Title>
  </Container>
);

// class Header extends Component {
//   render() {
//     return (
//       <div className="header">
//         <h1 className="f1 tc heading mt3 mb2">Hours Worked Tracker</h1>
//         <h3 className="f3 tc heading mt0 mb3">{getTodaysDate()}</h3>
//       </div>
//     );
//   }
// }

export default Header;
