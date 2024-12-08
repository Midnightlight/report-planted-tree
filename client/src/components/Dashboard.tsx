import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <Header>Dashboard</Header>
  );
};

export default Dashboard;
