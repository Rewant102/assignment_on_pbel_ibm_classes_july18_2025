import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

export default function AdminPrivateRoute({ children }) {
  const { admin } = useContext(AdminContext);
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}
