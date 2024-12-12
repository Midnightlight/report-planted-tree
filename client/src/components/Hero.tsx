import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 0;
  background: #dcfce7;

  @media (max-width: 768px) {
    padding: 50px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 15px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: #14532d;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  color: #166534;
  font-size: 18px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  background: #16a34a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 12px 18px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    font-size: 12px;
  }
`;

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/report-tree');
  };

  return (
    <HeroSection>
      <Title>Track and Report Your Tree-Planting Impact</Title>
      <Subtitle>Your small actions contribute to global change. Start monitoring your planted trees today!</Subtitle>
      <Button onClick={handleGetStarted}>Get Started</Button>
    </HeroSection>
  );
};

export default Hero;
