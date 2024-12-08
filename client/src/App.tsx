import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQs from './components/FAQs';
import ReportTree from './components/ReportTree';
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

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
          <Route path="/report-tree" element={<ReportTree />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Container>
      <Chatbot />
    </Router>
  );
};

export default App;
