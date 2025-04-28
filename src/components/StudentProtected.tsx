
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface StudentProtectedProps {
  children: ReactNode;
}

const StudentProtected = ({ children }: StudentProtectedProps) => {
  const { isAuthenticated, isStudent, isLoading } = useAuth();

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

  if (!isAuthenticated || !isStudent()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default StudentProtected;
