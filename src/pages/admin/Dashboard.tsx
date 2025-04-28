
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AdminProtected from "@/components/AdminProtected";
import CourseTable from "@/components/admin/CourseTable";
import TimetableTable from "@/components/admin/TimetableTable";
import DashboardHeader from "@/components/admin/DashboardHeader";

// Types
interface Course {
  id: number;
  course_name: string;
  degree: string;
  professor: string;
  location: string;
}

interface TimetableEntry {
  id: number;
  course_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [timetableEntries, setTimetableEntries] = useState<TimetableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for frontend display
  useEffect(() => {
    const mockCourses: Course[] = [
      { id: 1, course_name: "Database Systems", degree: "Computer Science", professor: "Dr. Smith", location: "Room 101" },
      { id: 2, course_name: "Web Programming", degree: "Computer Science", professor: "Prof. Johnson", location: "Lab 203" },
      { id: 3, course_name: "Data Structures and Algorithms", degree: "Computer Science", professor: "Dr. Williams", location: "Room 105" },
      { id: 4, course_name: "International Relations", degree: "Political Science", professor: "Prof. Davis", location: "Hall 301" },
      { id: 5, course_name: "Political Theory", degree: "Political Science", professor: "Dr. Miller", location: "Room 202" },
      { id: 6, course_name: "Anatomy", degree: "MBBS", professor: "Dr. Anderson", location: "Medical Lab 1" },
      { id: 7, course_name: "Physiology", degree: "MBBS", professor: "Prof. Wilson", location: "Medical Lab 2" },
      { id: 8, course_name: "Structural Analysis", degree: "Civil Engineering", professor: "Dr. Taylor", location: "Engineering Block 101" },
      { id: 9, course_name: "Fluid Mechanics", degree: "Civil Engineering", professor: "Prof. Thomas", location: "Engineering Block 102" },
    ];

    const mockTimetable: TimetableEntry[] = [
      { id: 1, course_id: 1, day_of_week: "Monday", start_time: "09:00", end_time: "10:30" },
      { id: 2, course_id: 2, day_of_week: "Monday", start_time: "11:00", end_time: "12:30" },
      { id: 3, course_id: 3, day_of_week: "Tuesday", start_time: "09:00", end_time: "11:00" },
      { id: 4, course_id: 4, day_of_week: "Tuesday", start_time: "13:00", end_time: "14:30" },
      { id: 5, course_id: 5, day_of_week: "Wednesday", start_time: "09:00", end_time: "10:30" },
      { id: 6, course_id: 6, day_of_week: "Wednesday", start_time: "11:00", end_time: "13:00" },
      { id: 7, course_id: 7, day_of_week: "Thursday", start_time: "09:00", end_time: "11:00" },
      { id: 8, course_id: 8, day_of_week: "Thursday", start_time: "13:00", end_time: "15:00" },
      { id: 9, course_id: 9, day_of_week: "Friday", start_time: "10:00", end_time: "12:00" },
    ];

    setCourses(mockCourses);
    setTimetableEntries(mockTimetable);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    setTimetableEntries(timetableEntries.filter(entry => entry.course_id !== id));
    toast({
      title: "Course deleted",
      description: "The course and its timetable entries have been removed",
    });
  };

  const handleDeleteTimetableEntry = (id: number) => {
    setTimetableEntries(timetableEntries.filter(entry => entry.id !== id));
    toast({
      title: "Timetable entry deleted",
      description: "The timetable entry has been removed",
    });
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader onLogout={handleLogout} />

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Manage Courses</h2>
                <Link to="/admin/courses/add">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Add New Course
                  </Button>
                </Link>
              </div>

              <CourseTable 
                courses={courses}
                isLoading={isLoading}
                onDeleteCourse={handleDeleteCourse}
              />
            </TabsContent>

            <TabsContent value="timetable" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Manage Timetable</h2>
                <Link to="/admin/timetable/add">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Add Timetable Entry
                  </Button>
                </Link>
              </div>

              <TimetableTable 
                timetableEntries={timetableEntries}
                courses={courses}
                isLoading={isLoading}
                onDeleteTimetableEntry={handleDeleteTimetableEntry}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminDashboard;
