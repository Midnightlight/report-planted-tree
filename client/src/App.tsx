import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InfoPage from './components/InfoPage';
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
    <Dashboard />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/info" element={<InfoPage />} />
=======
          <Route path="/report-tree" element={<ReportTree />} />
          <Route path="/report-measurement" element={<ReportMeasurement />} />
          <Route path="/contact-us" element={<ContactUs />} />
>>>>>>> cc5b33c (create measurement from)
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
