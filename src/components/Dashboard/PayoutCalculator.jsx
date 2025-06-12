import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useNews } from '../../context/NewsContext';
import { exportToPDF, exportToCSV } from '../../services/export';

const PayoutCalculator = () => {
  const { news } = useNews();
  const [payoutRate, setPayoutRate] = useState(() => 
    localStorage.getItem('payoutRate') || '1.00'
  );
  const [authorPayouts, setAuthorPayouts] = useState([]);

  useEffect(() => {
    localStorage.setItem('payoutRate', payoutRate);
    calculatePayouts();
  }, [payoutRate, news]);

  const calculatePayouts = () => {
    const authorCounts = news.reduce((acc, article) => {
      const author = article.author || 'Unknown';
      acc[author] = (acc[author] || 0) + 1;
      return acc;
    }, {});

    const payouts = Object.entries(authorCounts).map(([author, count]) => ({
      author,
      articles: count,
      rate: parseFloat(payoutRate),
      payout: (count * parseFloat(payoutRate)).toFixed(2)
    }));

    setAuthorPayouts(payouts.sort((a, b) => b.payout - a.payout));
  };

  const handleExportPDF = () => {
    exportToPDF(authorPayouts, 'payout-report.pdf');
  };

  const handleExportCSV = () => {
    exportToCSV(authorPayouts, 'payout-report.csv');
  };

  const totalPayout = authorPayouts.reduce((sum, author) => sum + parseFloat(author.payout), 0);

  return (
    <div>
      <h2 className="mb-4">💰 Payout Calculator</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="payout-card">
            <Card.Body>
              <Card.Title>Settings</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Payout Rate per Article ($)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={payoutRate}
                  onChange={(e) => setPayoutRate(e.target.value)}
                />
              </Form.Group>
              
              <div className="mb-3">
                <strong>Total Articles: </strong>{news.length}
              </div>
              <div className="mb-3">
                <strong>Total Authors: </strong>{authorPayouts.length}
              </div>
              <div className="mb-3">
                <strong>Total Payout: </strong>${totalPayout.toFixed(2)}
              </div>
              
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleExportPDF}>
                  Export PDF
                </Button>
                <Button variant="success" onClick={handleExportCSV}>
                  Export CSV
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="payout-card">
            <Card.Body>
              <Card.Title>Author Payouts</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Articles</th>
                    <th>Rate ($)</th>
                    <th>Total Payout ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {authorPayouts.map((author, index) => (
                    <tr key={index}>
                      <td>{author.author}</td>
                      <td>{author.articles}</td>
                      <td>${author.rate.toFixed(2)}</td>
                      <td><strong>${author.payout}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PayoutCalculator;
