import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext"; // ✅ import context

const AdminDashboard = () => {
  const { logout } = useContext(AdminContext); // ✅ get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ use context method
    navigate("/admin/login");
  };

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
