import React from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { signInWithGoogle } from '../../services/auth';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body className="text-center">
          <Card.Title className="mb-4">News Dashboard Login</Card.Title>
          <Button 
            variant="danger" 
            onClick={handleGoogleSignIn}
            className="w-100 mb-3"
          >
            <FaGoogle className="me-2" />
            Sign in with Google
          </Button>
          <Alert variant="info" className="small">
            Demo Admin: Use admin@example.com to access admin features
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
