import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useNews } from '../../context/NewsContext';

const SearchFilters = () => {
  const { filters, setFilters } = useNews();

  return (
    <Form className="mb-4">
      <Row>
        <Col md={3} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search articles..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Filter by author"
            value={filters.author}
            onChange={(e) => setFilters({ ...filters, author: e.target.value })}
          />
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFilters;
