import React, { useState } from "react";
import "./Map.css";
import ButtonSection from './ButtonSection';
import MeasurementForm from './MeasurementForm';


interface MapProps {
  selectedArea: string | null;
  setSelectedArea: React.Dispatch<React.SetStateAction<string | null>>;
}

const Map: React.FC<MapProps> = (props) => {
  // Names of the grid areas
  const areas: string[] = [
    "area1", "area2", "area3",
    "area4", "area5", "area6",
    "area7", "area8", "area9",
  ];

  // Handle click on grid square
  const handleSquareClick = (area: string) => {
    props.setSelectedArea(area);
  };

  return (
    <div>
      <div className="grid-map-container">
        <div className="grid-map">
          {areas.map((area, index) => (
            <div
              key={index}
              className={`grid-square ${props.selectedArea === area ? "highlight" : ""}`}
              onClick={() => handleSquareClick(area)}
            >
              {area}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
