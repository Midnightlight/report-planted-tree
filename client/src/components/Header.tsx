import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer; /* Optional: to show it's clickable */
`;

const Header = () => {
  return (
    <Navbar>
      {/* Wrap Logo in Link to make it clickable */}
      <Link to="/">
        <Logo>🌱 TreeTrack</Logo>
      </Link>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/report-tree">Report a Tree</Link>
        <Link to="/contact-us">Contact Us</Link>
      </NavLinks>
    </Navbar>
  );
};

export default Header;
