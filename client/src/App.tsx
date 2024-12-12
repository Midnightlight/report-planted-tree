import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQs from './components/FAQs';
import Chatbot from './components/Chatbot';
import 'leaflet/dist/leaflet.css';
import MapComponent from './components/MapComponent';
import Footer from './components/Footer'; // Import Footer


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #f0fdf4;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const Home = () => (
  <div>
    <Hero />
    <Features />
    <FAQs />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapComponent />} />
        </Routes>
      </Container>
      <Chatbot />
      <Footer /> 
    </Router>
  );
};

export default App;
