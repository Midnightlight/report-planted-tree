import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContactSection = styled.div`
  gap: 20px;
  flex-wrap: nowrap;  /* Prevent wrapping */
  flex-direction: row;  /* Set direction to row */
`;

const ContactHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContactText = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const ContactUs: React.FC = () => {

  return (
    <Container>
      <Header>Contact Us</Header>
      <ContactSection>
          <ContactHeader>If you have any questions or inquiries, feel free to contact us!</ContactHeader>
          <ContactText>📧 treetrack2024@gmail.com</ContactText>
          <ContactText>📞 +358 9 47001</ContactText>
          <ContactText>🏫 Aalto University Computer Science Building</ContactText>
          <ContactText>📍 Tietotekniikantalo, Konemiehentie 2, 02150 Espoo</ContactText>

          {/* Google Map Embed */}
          <MapContainer>
            <iframe
              title="Aalto University Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31738.125917585116!2d24.745837048632808!3d60.18680880000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df5eb42cdce71%3A0xb91d25a6b2e27680!2sAalto%20University%20Computer%20Science%20Building!5e0!3m2!1sen!2sfi!4v1733686761888!5m2!1sen!2sfi"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </MapContainer>
      </ContactSection>
    </Container>
  );
};

export default ContactUs;
