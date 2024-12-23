import React, { useState } from "react";
import styled from "styled-components";


const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;  /* Ensures padding is included in the element's width */

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const DataRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;  /* Ensures padding is included in the element's width */

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

interface FormRowData {
  species: string;
  height: string;
  circumference: string;
}

interface MeasurementReportProperties {
    setShowMeasurementForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportMeasurement: React.FC<MeasurementReportProperties> = (props) => {
  const [formRows, setFormRows] = useState<FormRowData[]>([
    { species: '', height: '', circumference: '' }
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedRows = [...formRows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setFormRows(updatedRows);
  };

  const addRow = () => {
    setFormRows([
      ...formRows,
      { species: '', height: '', circumference: '' } // Add a new empty row
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/report-growth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRows),
      });

      if (response) {
        setSuccessMessage("Tree report submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
        //props.setShowMap(true);
        //props.setShowGrowthForm(false)
      } else {
        console.error("Failed to submit the report:", response);
        alert("Failed to submit the tree report.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.setShowMeasurementForm(false);
    // if (species && count && date) {
    //   setShowMeasurementForm(false);  // Close the form after saving
    //   setSpecies('');
    //   setCount('');
    //   setDate('');
    // }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.setShowMeasurementForm(false);  // Close the form when canceled
  };

  const handleExitClick = () => {
    //props.setShowMap(true);;
    //props.setShowGrowthForm(false);
  };

  // Todo: const handleExit (also do if area is null)

  return (
    <div>
    <Header>Report Tree Measurements</Header>
    
    <form onSubmit={handleSubmit}>
    <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
        <label htmlFor="species">Species</label>
        </div>
        <div style={{ flex: 1 }}>
        <label htmlFor="height">Height</label>
        </div>
        <div style={{ flex: 1 }}>
        <label htmlFor="circumference">Circumference</label>
        </div>
    </div>



    {formRows.map((row, index) => (
        <DataRow key={index}>
        <div style={{ flex: 1 }}>
            <Select
            name="species"
            value={row.species}
            onChange={(e) => handleInputChange(index, e)}
            required
            >
            <option value="" disabled>Select species</option>
            <option value="Oak">Oak</option>
            <option value="Pine">Pine</option>
            <option value="Maple">Maple</option>
            </Select>
        </div>

        <div style={{ flex: 1 }}>
            <Input
            type="text"
            id={`height-${index}`}
            name="height"
            value={row.height}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Height (cm)"
            />
        </div>

        <div style={{ flex: 1 }}>
            <Input
            type="text"
            id={`circumference-${index}`}
            name="circumference"
            value={row.circumference}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Circumference (cm)"
            />
        </div>
        </DataRow>
    ))}

    <Button type="button" onClick={addRow} style={{marginTop: '5px'}}>
        + Add Row
    </Button>


    </form>

    {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

    <button className="save" onClick={handleSave}>
      Add
    </button>
    <button className="cancel" onClick={handleCancel}>
      Cancel
    </button>
  </div>
  );
};

export default ReportMeasurement;