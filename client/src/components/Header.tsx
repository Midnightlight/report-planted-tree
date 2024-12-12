import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  @media (max-width: 768px) {
    padding: 20px 50px;
  }
  @media (max-width: 480px) {
    padding: 15px 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }

  a {
    flex-grow: 1;
    text-align: center;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 22px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Header = () => {
  return (
    <Navbar>
      <Link to="/">
        <Logo>🌱 TreeTrack</Logo>
      </Link>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/map">Map</Link>
      </NavLinks>
    </Navbar>
  );
};

export default Header;
