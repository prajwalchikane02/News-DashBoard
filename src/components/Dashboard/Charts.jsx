import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNews } from '../../context/NewsContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = () => {
  const { news } = useNews();

  // Process data for charts
  const authorCounts = news.reduce((acc, article) => {
    const author = article.author || 'Unknown';
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const topAuthors = Object.entries(authorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const barData = {
    labels: topAuthors.map(([author]) => author.length > 20 ? author.substring(0, 20) + '...' : author),
    datasets: [
      {
        label: 'Articles Count',
        data: topAuthors.map(([, count]) => count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: topAuthors.slice(0, 5).map(([author]) => author),
    datasets: [
      {
        data: topAuthors.slice(0, 5).map(([, count]) => count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h2 className="mb-4">📊 News Analytics</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="chart-container">
            <Card.Body>
              <Card.Title>Top Authors by Article Count</Card.Title>
              <Bar data={barData} options={options} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="chart-container">
            <Card.Body>
              <Card.Title>Article Distribution (Top 5 Authors)</Card.Title>
              <Pie data={pieData} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Charts;
