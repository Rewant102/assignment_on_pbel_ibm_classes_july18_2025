// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f0f0',
      fontSize: '1.5rem',
    }}>
      <h1>🏠 Welcome to the Home Page</h1>
      <p>Select an action below:</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login">
          <button>User Login</button>
        </Link>
        <Link to="/admin/login">
          <button>Admin Login</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
