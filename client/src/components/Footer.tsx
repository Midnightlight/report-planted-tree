// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

// Styled component for Footer
const FooterContainer = styled.footer`
  text-align: center;
  padding: 5px;
  background: #f0fdf4;
  color: #166534;
  margin-top: 20px;
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
