
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Timetable from "./pages/Timetable";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/admin/Dashboard";
import AddCourse from "./pages/admin/courses/AddCourse";
import EditCourse from "./pages/admin/courses/EditCourse";
import AddTimetableEntry from "./pages/admin/timetable/AddTimetableEntry";
import EditTimetableEntry from "./pages/admin/timetable/EditTimetableEntry";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/timetable" 
              element={
                <ProtectedRoute allowedRole="any">
                  <Timetable />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses/add" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AddCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses/edit/:id" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <EditCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/timetable/add" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AddTimetableEntry />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/timetable/edit/:id" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <EditTimetableEntry />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
