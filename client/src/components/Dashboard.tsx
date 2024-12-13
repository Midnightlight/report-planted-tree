import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend, BarElement);

const DashboardContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #2B8E3B;
  margin-bottom: 0;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  color: black;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: black;
  margin-top: 20px;
  text-align: center;
`;

interface DashboardProps {
  markersUpdated: boolean;
}

const Dashboard = ({ markersUpdated }: DashboardProps) => {
  const [treeLineChartData, setTreeLineChartData] = useState<{ labels: string[], datasets: any[] }>({ labels: [], datasets: [] });
  const [treeBarChartData, setTreeBarChartData] = useState<{ labels: string[], datasets: any[] }>({ labels: [], datasets: [] });

  const fetchChartData = useCallback(() => {
    const storedMarkers = JSON.parse(localStorage.getItem('markers') || '[]');
  
    const predefinedSpecies = ['oak', 'maple', 'pine'];
    const speciesCountMap: { [key: string]: number } = {};
    const monthlyCountMap = Array(12).fill(0);
    const currentYear = new Date().getFullYear();
  
    storedMarkers.forEach((marker: { species: string, count: number, date: string }) => {
      const species = marker.species.trim().toLowerCase();
      
      const plantingDate = new Date(marker.date);
      if (plantingDate.getFullYear() === currentYear) {
        monthlyCountMap[plantingDate.getMonth()] += marker.count;
      }
  
      if (predefinedSpecies.includes(species)) {
        const capitalizedSpecies = species.charAt(0).toUpperCase() + species.slice(1);
        speciesCountMap[capitalizedSpecies] = (speciesCountMap[capitalizedSpecies] || 0) + marker.count;
      } else {
        speciesCountMap['Other'] = (speciesCountMap['Other'] || 0) + marker.count;
      }
    });
  
    const speciesLabels = Object.keys(speciesCountMap);
    const speciesDataset = Object.values(speciesCountMap);
  
    setTreeLineChartData({
      labels: speciesLabels,
      datasets: [
        {
          label: 'Number of Trees Planted by Species',
          data: speciesDataset,
          borderColor: '#34A853',
          backgroundColor: '#34A853',
          tension: 0.4,
        },
      ],
    });
  
    setTreeBarChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Total Trees Planted Per Month',
          data: monthlyCountMap,
          backgroundColor: '#34A853',
        },
      ],
    });
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [markersUpdated, fetchChartData]);

  return (
    <DashboardContainer>
      <Title>Planted Tree Dashboard</Title>
      <SubTitle>Number of Trees Planted by Species</SubTitle>
      <Line data={treeLineChartData} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return `${context.dataset.label}: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tree Species',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Trees',
            },
          },
        },
      }} />
      <SubTitle>Monthly Total Trees Planted</SubTitle>
      <Bar data={treeBarChartData} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Trees',
            },
          },
        },
      }} />
      <InfoText>Click or hover over the chart points to see detailed values</InfoText>
    </DashboardContainer>
  );
};

export default Dashboard;