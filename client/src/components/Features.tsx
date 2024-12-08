import React from 'react';
import styled from 'styled-components';

const FeatureSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    padding: 20px 0;
    justify-content: space-around;
  }
`;

const FeatureCard = styled.div`
  background: #f7f9f7;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: 200px;
  }

  @media (max-width: 480px) {
    min-width: 150px;
  }
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 35px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const FeatureDescription = styled.p`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Features = () => {
  return (
    <FeatureSection>
      <FeatureCard>
        <Icon>🌱</Icon>
        <FeatureTitle>Record Tree-Planting</FeatureTitle>
        <FeatureDescription>
          Easily record and document your tree-planting activities with our intuitive tracking system.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Icon>📊</Icon>
        <FeatureTitle>Visualize Growth</FeatureTitle>
        <FeatureDescription>
          Track and visualize your trees' growth progress over time with detailed data insights.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Icon>🔗</Icon>
        <FeatureTitle>Share Contributions</FeatureTitle>
        <FeatureDescription>
          Connect with and inspire your community by sharing your environmental contributions.
        </FeatureDescription>
      </FeatureCard>
    </FeatureSection>
  );
};

export default Features;
