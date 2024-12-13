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
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

const AppWrapper = styled.div`
  background-color: #f0fdf4; /* Full screen background color */
`;

const HomeWrapper = styled.div`
  padding-top: 20px; 
`;

const Container = styled.div`
  padding: 80px 20px 0;
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
  <HomeWrapper>
    <Hero />
    <Features />
    <FAQs />
  </HomeWrapper>
  );

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapComponent />} />
        </Routes>
      </Container>
      <Chatbot />
      </AppWrapper>
      <Footer /> 
    </Router>
  );
};

export default App;
