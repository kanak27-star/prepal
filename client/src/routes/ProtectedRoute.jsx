import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loader while checking auth
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access
  return children;
}