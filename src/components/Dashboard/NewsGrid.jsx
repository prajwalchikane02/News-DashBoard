import React from 'react';
import { Card, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { useNews } from '../../context/NewsContext';

const NewsGrid = () => {
  const { news, loading, filters, setFilters } = useNews();

  return (
    <div>
      <h2 className="mb-4">📰 News Dashboard</h2>
      
      {/* Filters */}
      <Card className="filter-card mb-4">
        <Row>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search articles..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Filter by author"
              value={filters.author}
              onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </Col>
        </Row>
      </Card>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h4>{news.length}</h4>
              <p className="text-muted">Total Articles</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h4>{new Set(news.map(a => a.author)).size}</h4>
              <p className="text-muted">Unique Authors</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h4>{news.filter(a => new Date(a.publishedAt) > new Date(Date.now() - 24*60*60*1000)).length}</h4>
              <p className="text-muted">Today's Articles</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {news.length === 0 ? (
            <Alert variant="info">No articles found. Try adjusting your filters.</Alert>
          ) : (
            news.map((article, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="news-card h-100">
                  {article.urlToImage && (
                    <Card.Img 
                      variant="top" 
                      src={article.urlToImage} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="h6">{article.title}</Card.Title>
                    <Card.Text className="small text-muted">
                      By {article.author || 'Unknown'} • {new Date(article.publishedAt).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text className="small">
                      {article.description?.substring(0, 100)}...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default NewsGrid;
