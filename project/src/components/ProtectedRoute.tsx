import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  if (!role) return <Navigate to="/" />; // Redirect if role not found

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
