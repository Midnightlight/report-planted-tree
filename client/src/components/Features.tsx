import React from 'react';
import styled from 'styled-components';

const FeatureSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
`;

const FeatureCard = styled.div`
  background: #f7f9f7;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  width: 30%;
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
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