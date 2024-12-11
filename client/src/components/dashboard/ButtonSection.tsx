import "./Map.css";
import React from "react";

// Define the props type
interface ButtonSectionProps {
  area: string | null;
}

const ButtonSection: React.FC<ButtonSectionProps> = (props) => {
  if (props.area != null) {
    return (
      <div className="button-section">
        <button
          className="button"
          onClick={() => console.log("New")}
        >
          Report new trees
        </button>
        <button
          className="button"
          onClick={() => console.log("Growth")}
        >
          Report growth
        </button>
      </div>
    );
  } else {
    return <h2>Please choose area</h2>;
  }
};

export default ButtonSection;