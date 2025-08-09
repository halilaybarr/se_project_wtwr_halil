import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("jwt"); 

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;