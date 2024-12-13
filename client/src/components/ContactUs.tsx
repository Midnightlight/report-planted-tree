import React from 'react';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

const Container = styled.div`
  max-width: 800px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 40px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  color: #2B8E3B;
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
  padding-bottom: 20px;
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


const ContactUs: React.FC = () => {
  return (
    <Container>
      <Header>Contact Us</Header>
      <ContactSection>
        <ContactHeader>If you have any questions or inquiries, feel free to contact us!</ContactHeader>
        <ContactText>📞 +358 9 47001</ContactText>
        <ContactText>🏫 Aalto University Computer Science Building</ContactText>
        <ContactText>📌 Tietotekniikantalo, Konemiehentie 2, 02150 Espoo</ContactText>
      </ContactSection>
    </Container>
  );
};

export default ContactUs;
