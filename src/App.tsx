
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Timetable from "./pages/Timetable";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AddCourse from "./pages/admin/courses/AddCourse";
import EditCourse from "./pages/admin/courses/EditCourse";
import AddTimetableEntry from "./pages/admin/timetable/AddTimetableEntry";
import EditTimetableEntry from "./pages/admin/timetable/EditTimetableEntry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses/add" element={<AddCourse />} />
          <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
          <Route path="/admin/timetable/add" element={<AddTimetableEntry />} />
          <Route path="/admin/timetable/edit/:id" element={<EditTimetableEntry />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
