import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaDollarSign } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin, currentUser } = useAuth(); // Get both values

  // Debug logs
  console.log('Current User Email:', currentUser?.email);
  console.log('Is Admin:', isAdmin);
  console.log('Email comparison result:', currentUser?.email === 'prajwalchikane0@gmail.com');

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar p-3">
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/" 
          className={`mb-2 ${isActive('/') ? 'bg-primary text-white rounded' : ''}`}
        >
          <FaHome className="me-2" />
          Dashboard
        </Nav.Link>
        {isAdmin && (
          <>
            <Nav.Link 
              as={Link} 
              to="/analytics"
              className={`mb-2 ${isActive('/analytics') ? 'bg-primary text-white rounded' : ''}`}
            >
              <FaChartBar className="me-2" />
              Analytics
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/payouts"
              className={`mb-2 ${isActive('/payouts') ? 'bg-primary text-white rounded' : ''}`}
            >
              <FaDollarSign className="me-2" />
              Payouts
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};


export default Sidebar;
