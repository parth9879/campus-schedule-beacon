
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole?: "admin" | "student" | "any";
}

const ProtectedRoute = ({ children, allowedRole = "any" }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isStudent, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated at all
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but wrong role
  if (allowedRole === "admin" && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole === "student" && !isStudent()) {
    return <Navigate to="/" replace />;
  }

  // All checks passed
  return <>{children}</>;
};

export default ProtectedRoute;
