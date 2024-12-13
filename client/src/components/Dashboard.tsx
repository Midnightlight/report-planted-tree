import React, { useState } from "react";
import styled from 'styled-components';

import Map from './dashboard/Map'
import ButtonSection from './dashboard/ButtonSection';
import ReportMeasurement from "./dashboard/MeasurementForm";


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

// Define the props type
interface TitleProps {
  area: string | null;
}

const Title: React.FC<TitleProps> = (props) => {
  if (props.area != null) {
    return(
      <Header>{props.area}</Header>
    )
  } else {
    return(
      <Header>Choose area</Header>
    )
  }
}


const Dashboard: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [showGrowthForm, setShowGrowthForm] = useState(false);

  return (
    <div>
      <Title area={selectedArea}/>
      {showMap && <Map selectedArea={selectedArea} setSelectedArea={setSelectedArea}/> }
      {showMap && <ButtonSection area={selectedArea} setShowMap={setShowMap} setShowGrowthForm={setShowGrowthForm}/> }
      {showGrowthForm && <ReportMeasurement area={selectedArea} setShowMap={setShowMap} setShowGrowthForm={setShowGrowthForm}/>}
    </div>
  );
};

export default Dashboard;
