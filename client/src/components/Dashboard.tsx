import React, { useState, useEffect, ComponentProps, useCallback } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

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
  const [chartData, setChartData] = useState<{ labels: string[], datasets: any[] }>({ labels: [], datasets: [] });

  const fetchChartData = useCallback(() => {
    const storedMarkers = JSON.parse(localStorage.getItem('markers') || '[]');

    const predefinedSpecies = ['oak', 'maple', 'pine'];

    const speciesCountMap: { [key: string]: number } = {};

    storedMarkers.forEach((marker: { species: string, count: number }) => {
      const species = marker.species.trim().toLowerCase();

      if (predefinedSpecies.includes(species)) {
        const capitalizedSpecies = species.charAt(0).toUpperCase() + species.slice(1);
        speciesCountMap[capitalizedSpecies] = (speciesCountMap[capitalizedSpecies] || 0) + marker.count;
      } else {
        speciesCountMap['Other'] = (speciesCountMap['Other'] || 0) + marker.count;
      }
    });

    const labels = Object.keys(speciesCountMap);
    const dataset = Object.values(speciesCountMap);

    const data = {
      labels,
      datasets: [
        {
          label: 'Number of Trees Planted',
          data: dataset,
          borderColor: '#34A853',
          backgroundColor: '#34A853',
          tension: 0.4,
        },
      ],
    };

    setChartData(data);
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [markersUpdated, fetchChartData]);

  return (
    <DashboardContainer>
      <Title>Planted Tree Dashboard</Title>
      <SubTitle>Number of Trees Planted by Species</SubTitle>
      <Line data={chartData} options={{
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
            ticks: {
              stepSize: 3,
            },
            title: {
              display: true,
              text: 'Number of Trees',
            },
          },
        },
      }}
      />
      <InfoText>Click or hover over the chart points to see detailed values</InfoText>
    </DashboardContainer>
  );
};

export default Dashboard;