import React from 'react';
import Hero from './Hero';
import Features from './Features';
import FAQs from './FAQs';
import ContactUs from './ContactUs';

const InfoPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <FAQs />
      <ContactUs />
    </div>
  );
};

export default InfoPage;
