import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FormComponent from './FormComponent';
import { StyledPopupContentComponent } from './FormComponent';
import ContactUs from './ContactUs';
import { Leaf, MapPin, CirclePlus } from 'lucide-react';
import Dashboard from './Dashboard';

const Title = styled.h1`
  margin-top: 80px;
  font-size: 36px;
  font-weight: bold;
  color: #2B8E3B;
  margin-bottom: 0;
  justify-content: center;
  display: flex;
`;

const InstructionsContainer = styled.div`
  padding-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

const InstructionHeader = styled.div`
  color: #14532d;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InstructionSubHeader = styled.div`
  color: #777;
  font-size: 14px;
  margin-bottom: 20px;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const StepBox = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const StepIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StepText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #14532d;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 500px;
  margin: 20px 0;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 18px;
    color: gray;
  }
`;

const MapWrapperContainer = styled.div`
  padding-top: 50px;
`;

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const customLeafIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

const RecenterMap = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [leafMarkers, setLeafMarkers] = useState<{ position: LatLngExpression; species: string; count: number; date: string }[]>([]);
  const [markersUpdated, setMarkersUpdated] = useState(false);

  useEffect(() => {
    const storedMarkers = localStorage.getItem('markers');
    if (storedMarkers) {
      setLeafMarkers(JSON.parse(storedMarkers));
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        const userLocation: LatLngExpression = [latitude, longitude];
        setMapCenter(userLocation);
        setPosition(userLocation);
      },
      () => {
        setError('Unable to fetch your location. Please ensure location access is enabled.');
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const addLeafMarker = (position: LatLngExpression, species: string, count: number, date: string) => {
    const newMarker = { position, species, count, date };
    setLeafMarkers((prev) => {
      const updatedMarkers = [...prev, newMarker];
      localStorage.setItem('markers', JSON.stringify(updatedMarkers));
      setMarkersUpdated((prevState) => !prevState);
      return updatedMarkers;
    });
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapWrapperContainer>
        <Title>Planted Tree Report</Title>
        <InstructionsContainer>
          <InstructionHeader>How To Use TreeTrack</InstructionHeader>
          <InstructionSubHeader>Follow these simple steps to report planted trees</InstructionSubHeader>
          <StepsContainer>
            <StepBox>
              <StepIcon>
                <MapPin color="#16a34a" size={40} />
              </StepIcon>
              <StepText>
                <strong>1. Choose Location</strong>
                <br />
                Click anywhere on the map to select a planting location
              </StepText>
            </StepBox>
            <StepBox>
              <StepIcon>
                <CirclePlus color="#16a34a" size={40} />
              </StepIcon>
              <StepText>
                <strong>2. Add Details</strong>
                <br />
                Enter the tree species and quantity in the popup form
              </StepText>
            </StepBox>
            <StepBox>
              <StepIcon>
                <Leaf color="#16a34a" size={40} />
              </StepIcon>
              <StepText>
                <strong>3. View Reports</strong>
                <br />
                Click on leaf markers to view planted tree details
              </StepText>
            </StepBox>
          </StepsContainer>
        </InstructionsContainer>

        <MapWrapper>
          {mapCenter ? (
            <MapContainer center={mapCenter} zoom={13} className="leaflet-container">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap center={mapCenter} />
              {position && (
                <Marker position={position} icon={customIcon}>
                  <Popup>You are here: {position.toString()}</Popup>
                </Marker>
              )}
              {leafMarkers.map((marker, index) => (
                <Marker key={index} position={marker.position} icon={customLeafIcon}>
                  <Popup>
                    <StyledPopupContentComponent species={marker.species} count={marker.count} date={marker.date} />
                  </Popup>
                </Marker>
              ))}
              <FormComponent addMarker={addLeafMarker} />
            </MapContainer>
          ) : (
            <div className="loading">Loading map...</div>
          )}
        </MapWrapper>
      </MapWrapperContainer>
      <Dashboard markersUpdated={markersUpdated} />
      <ContactUs />
    </>
  );
};

export default MapComponent;