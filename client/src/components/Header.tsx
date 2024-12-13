import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
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
      <Link to="/info">
        <Logo>🌱 TreeTrack</Logo>
      </Link>
    </Navbar>
  );
};

export default Header;
