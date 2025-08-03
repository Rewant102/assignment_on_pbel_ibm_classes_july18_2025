// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
   <nav>
  <Link to="/">Home</Link>
  <Link to="/products">Shop</Link>
  <Link to="/cart">Cart</Link>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
  <Link to="/admin/login">Admin</Link>
  {admin && (
    <>
      <span> | Welcome, {admin.email || 'Admin'}</span>
      <button onClick={handleLogout}>Logout</button>
    </>
  )}
</nav>
  );
};

export default Navbar;
