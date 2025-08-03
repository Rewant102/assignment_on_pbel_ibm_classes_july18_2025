import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("adminInfo"));

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;