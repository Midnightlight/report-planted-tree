import React, { useState } from "react";
import styled from 'styled-components';
import "./Map.css";
import ButtonSection from './ButtonSection';

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

const Map: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Names of the grid areas
  const areas: string[] = [
    "area1", "area2", "area3",
    "area4", "area5", "area6",
    "area7", "area8", "area9",
  ];

  // Handle click on grid square
  const handleSquareClick = (area: string) => {
    setSelectedArea(area);
  };

  return (
    <div>
      <Title area={selectedArea}/>
      <div className="grid-map-container">
        <div className="grid-map">
          {areas.map((area, index) => (
            <div
              key={index}
              className={`grid-square ${selectedArea === area ? "highlight" : ""}`}
              onClick={() => handleSquareClick(area)}
            >
              {area}
            </div>
          ))}
        </div>
      </div>
      <ButtonSection area={selectedArea} />
    </div>
  );
};

export default Map;
