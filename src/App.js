import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import NewsGrid from './components/Dashboard/NewsGrid';
import Charts from './components/Dashboard/Charts';
import PayoutCalculator from './components/Dashboard/PayoutCalculator';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NewsProvider>
          <div className="App">
            <Navbar />
            <Container fluid>
              <Row>
                <Col md={3} className="p-0">
                  <Sidebar />
                </Col>
                <Col md={9} className="main-content">
                  <div className="p-4">
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/" element={
                        <PrivateRoute>
                          <NewsGrid />
                        </PrivateRoute>
                      } />
                      <Route path="/analytics" element={
                        <PrivateRoute requiredRole="admin">
                          <Charts />
                        </PrivateRoute>
                      } />
                      <Route path="/payouts" element={
                        <PrivateRoute requiredRole="admin">
                          <PayoutCalculator />
                        </PrivateRoute>
                      } />
                    </Routes>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </NewsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
