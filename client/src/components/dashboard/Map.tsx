import React, { useState } from "react";
import "./Map.css";
import ButtonSection from './ButtonSection';

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
