import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link to= "/">Home</Link>
      <Link to="/add-product">Add Product</Link>
      {localStorage.getItem('token') ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="deleteProduct">Delete Product</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;