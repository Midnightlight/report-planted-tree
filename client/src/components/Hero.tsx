import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 0;
  background: #f0f7f0;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: #34c759;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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
