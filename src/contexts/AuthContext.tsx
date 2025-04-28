
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "student";

interface User {
  id: string;
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isStudent: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load user from storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock user database for demonstration purposes
  // In a real app, this would be stored in a database
  const mockUsers = [
    { id: "1", username: "admin", password: "password", role: "admin" as UserRole },
    { id: "2", username: "student", password: "password", role: "student" as UserRole },
  ];

  const hashPassword = (password: string): string => {
    // This is a simplified mock of password hashing
    // In a real app, use bcrypt or argon2
    return password + "_hashed";
  };

  const verifyPassword = (password: string, hashedPassword: string): boolean => {
    // This is a simplified mock of password verification
    return hashPassword(password) === hashedPassword;
  };
  
  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock API call with artificial delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find user in mock database
        const foundUser = mockUsers.find(u => u.username === username);
        
        if (foundUser && verifyPassword(password, foundUser.password + "_hashed")) {
          // Create a user object without sensitive info
          const safeUser = {
            id: foundUser.id,
            username: foundUser.username,
            role: foundUser.role
          };
          
          // Save to state and localStorage
          setUser(safeUser);
          localStorage.setItem("user", JSON.stringify(safeUser));
          
          // Set admin authentication if role is admin
          if (safeUser.role === "admin") {
            localStorage.setItem("adminAuthenticated", "true");
          }
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${username}!`,
          });
          
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid username or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 1000);
    });
  };

  const signUp = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock signup functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username already exists
        const existingUser = mockUsers.find(u => u.username === username);
        
        if (existingUser) {
          toast({
            title: "Registration failed",
            description: "Username already exists",
            variant: "destructive",
          });
          resolve(false);
          return;
        }
        
        // In a real app, this would insert the user into a database
        const newUser = {
          id: String(mockUsers.length + 1),
          username,
          password: hashPassword(password),
          role
        };
        
        // Mock adding to database
        mockUsers.push(newUser);
        
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isStudent = () => {
    return user?.role === "student";
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signUp,
    logout,
    isAdmin,
    isStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
