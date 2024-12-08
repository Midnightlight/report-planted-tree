import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
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
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ReportTree: React.FC = () => {
  const [formData, setFormData] = useState({
    numberOfTrees: "",
    plantingLocation: "",
    treeSpecies: "",
    additionalNotes: "",
    monitorGrowth: false,
  });

  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    // Check if the input is a checkbox
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocationError("");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          plantingLocation: `${latitude}, ${longitude}`,
        });
        setLoading(false);
      },
      (error) => {
        setLocationError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/report-tree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSuccessMessage("Tree report submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        console.error("Failed to submit the report:", response);
        alert("Failed to submit the tree report.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred while submitting the report.");
    }
  };
  

  return (
    <Container>
      <Header>🌳 Report a Tree</Header>
      <form onSubmit={handleSubmit}>
        <Input
          type="number"
          name="numberOfTrees"
          placeholder="Enter number of trees planted"
          value={formData.numberOfTrees}
          onChange={handleChange}
          required
        />

        <div style={{ marginBottom: "10px" }}>
          <Input
            type="text"
            name="plantingLocation"
            placeholder="Search or input planting location"
            value={formData.plantingLocation}
            onChange={handleChange}
          />
          <Button type="button" onClick={getCurrentLocation}>
            {loading ? "Loading..." : "Use My Current Location"}
          </Button>
          {locationError && <ErrorMessage>{locationError}</ErrorMessage>}
        </div>

        <Select name="treeSpecies" value={formData.treeSpecies} onChange={handleChange} required>
          <option value="" disabled>
            Select species
          </option>
          <option value="Oak">Oak</option>
          <option value="Pine">Pine</option>
          <option value="Maple">Maple</option>
        </Select>

        <TextArea
          name="additionalNotes"
          placeholder="Additional notes about your tree planting"
          rows={4}
          value={formData.additionalNotes}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="monitorGrowth"
            checked={formData.monitorGrowth}
            onChange={handleChange}
          />
          I want to monitor this tree's growth
        </label>

        <Button type="submit">Submit Report</Button>
      </form>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} {/* Display success message */}
    </Container>
  );
};

export default ReportTree;
