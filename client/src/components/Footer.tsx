import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 5px;
  border-top: 1px solid #6bff9e;
  background: #dcfce7;
  color: #166534;
  margin-top: 3px;
  font-weight: bold
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} 🌱 TreeTrack. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
