import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/auth';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { currentUser, isAdmin } = useAuth(); // get isAdmin
;
console.log('Logged in email:', currentUser?.email);
  const handleLogout = () => {
    logout();
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <BootstrapNavbar.Brand as={Link} to="/" className="ms-3">
        📰 News Dashboard
      </BootstrapNavbar.Brand>
      
      {currentUser && (
        <>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            {isAdmin && (
              <>
                <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
                <Nav.Link as={Link} to="/payouts">Payouts</Nav.Link>
              </>
            )}
          </Nav>
          
          <div className="d-flex align-items-center me-3">
            <span className="text-light me-3">
              Welcome, {currentUser.displayName || currentUser.email}
            </span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              <FaSignOutAlt />
            </Button>
          </div>
        </>
      )}
    </BootstrapNavbar>
  );
};

export default Navbar;
