import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Styled components (same as before)
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  color: #166534;
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

const ContactSection = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ContactHeader = styled.h2`
  color: #14532d;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ContactText = styled.p`
  color: #14532d;
  font-size: 16px;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const MapContainerStyled = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const ContactUs: React.FC = () => {
  // Correct Aalto University Computer Science coordinates
  const AALTO_UNI_COORDS: [number, number] = [60.1855, 24.8275]; // Correct coordinates

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Container>
      <Header>Contact Us</Header>
      <ContactSection>
        <ContactHeader>If you have any questions or inquiries, feel free to contact us!</ContactHeader>
        <ContactText>📧 treetrack2024@gmail.com</ContactText>
        <ContactText>📞 +358 9 47001</ContactText>
        <ContactText>🏫 Aalto University Computer Science Building</ContactText>
        <ContactText>📍 Tietotekniikantalo, Konemiehentie 2, 02150 Espoo</ContactText>

        {/* Leaflet Map with marker */}
        <MapContainerStyled>
          <MapContainer center={AALTO_UNI_COORDS} zoom={15} style={{ width: '100%', height: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={AALTO_UNI_COORDS} icon={customIcon}>
              <Popup>Aalto University Computer Science Department</Popup>
            </Marker>
          </MapContainer>
        </MapContainerStyled>
      </ContactSection>
    </Container>
  );
};

export default ContactUs;
