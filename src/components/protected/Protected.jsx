import { Navigate } from "react-router-dom";
// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("currentUser");
  if (user===null) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};