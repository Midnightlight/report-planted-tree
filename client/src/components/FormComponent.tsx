import React, { useState, useEffect } from 'react';
import { Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import styled from 'styled-components';
import ReportMeasurement from './MeasurementFormComponent';

const StyledPopupContent = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #14532d;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .label {
    font-weight: bold;
    color: #4caf50;
    margin-bottom: 5px;
  }

  .value {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }

  .footer {
    font-size: 12px;
    color: #888;
    text-align: center;
    width: 100%;
    margin-top: 5px;
    border-top: 1px solid #ddd;
    padding-top: 5px;
  }

  button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #45a049;
  }
`;

const PopupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #f9f9f9;
  border: 2px solid #4caf50;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  label {
    font-size: 14px;
    color: #14532d;
    font-weight: bold;
  }

  input {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
    font-size: 14px;
  }

  button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .save {
    background-color: #4caf50;
    color: white;
    margin-right: 10px;

    &:hover {
      background-color: #45a049;
    }
  }

  .cancel {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;

const FormComponent = ({
  addMarker,
}: {
  addMarker: (position: LatLngExpression, species: string, count: number, date: string) => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [species, setSpecies] = useState('');
  const [count, setCount] = useState('');
  const [date, setDate] = useState('');
  const [popupPosition, setPopupPosition] = useState<LatLngExpression | null>(null);
  const map = useMapEvents({
    click(e) {
      setPopupPosition(e.latlng);
      setShowForm(true);
    },
  });


  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (species && count && popupPosition && date) {
      const newMarker = { position: popupPosition, species, count: parseInt(count), date };
  
      addMarker(popupPosition, species, parseInt(count), date);
  
      setShowForm(false);
      setSpecies('');
      setCount('');
      setDate('');
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowForm(false);
    setPopupPosition(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!document.querySelector('.popup-form')?.contains(e.target as Node)) {
        handleCancel(e as unknown as React.MouseEvent);
      }
    };
    if (showForm) {
      map.getContainer().addEventListener('click', handleClickOutside);
    }
    return () => {
      map.getContainer().removeEventListener('click', handleClickOutside);
    };
  }, [showForm, map]);

  return showForm && popupPosition ? (
    <Popup position={popupPosition}>
      <PopupForm className="popup-form">
        <label>
          Species:
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="Enter species name"
          />
        </label>
        <label>
          Count:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Enter count"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div>
          <button className="save" onClick={handleSave}>
            Add
          </button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </PopupForm>
    </Popup>
  ) : null;
};

export const MeasurementFormComponent = ({ setShowMeasurementForm }: { setShowMeasurementForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [species, setSpecies] = useState('');
  const [count, setCount] = useState('');
  const [date, setDate] = useState('');

  return (
      <PopupForm className="popup-form">
        <ReportMeasurement setShowMeasurementForm={setShowMeasurementForm} />
      </PopupForm>
  );
};


export const StyledPopupContentComponent = ({
  species, 
  count, 
  date, 
  setShowMeasurementForm 
}: { 
  species: string; 
  count: number; 
  date: string; 
  setShowMeasurementForm: React.Dispatch<React.SetStateAction<boolean>>; 
}) => {
  const handleOpenMeasurementForm = () => {
    setShowMeasurementForm(true);  // Show the measurement form when the button is clicked
  };

  return (
    <StyledPopupContent>
      <div>
        <span className="label">Species:</span>
        <span className="value">{species}</span>
      </div>
      <div>
        <span className="label">Count:</span>
        <span className="value">{count}</span>
      </div>
      <div>
        <span className="label">Date:</span>
        <span className="value">{date}</span>
      </div>
      <button onClick={handleOpenMeasurementForm}>
        Add Measurements
      </button>
      <div className="footer">Added via Form</div>
    </StyledPopupContent>
  );
};

export default FormComponent;