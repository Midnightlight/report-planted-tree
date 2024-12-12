import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FormComponent from './FormComponent';
import { StyledPopupContentComponent } from './FormComponent';
import ContactUs from './ContactUs';

// Styled Components
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

// Custom marker icons
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
  shadowAnchor: [4, 62]
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
  const [leafMarkers, setLeafMarkers] = useState<{ position: LatLngExpression; species: string; count: number }[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        const userLocation: LatLngExpression = [latitude, longitude];
        setMapCenter(userLocation); // Update map center with the user's location
        setPosition(userLocation);
      },
      (error) => {
        setError("Unable to fetch your location. Make sure location access is enabled.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const addLeafMarker = (position: LatLngExpression, species: string, count: number) => {
    setLeafMarkers((prev) => [...prev, { position, species, count }]);
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <StyledPopupContentComponent species={marker.species} count={marker.count} />
                  </Popup>
                </Marker>
              ))}
            <FormComponent setLeafPosition={() => {}} addMarker={addLeafMarker} />
          </MapContainer>
        ) : (
          <div className="loading">Loading map...</div>
        )}
      </MapWrapper>
      <ContactUs />
    </>
  );
};

export default MapComponent;
