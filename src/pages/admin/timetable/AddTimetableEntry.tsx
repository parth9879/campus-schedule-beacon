
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import AdminProtected from "@/components/AdminProtected";

// Types
interface Course {
  id: number;
  course_name: string;
  degree: string;
  professor: string;
  location: string;
}

const AddTimetableEntry = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [entry, setEntry] = useState({
    course_id: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data for frontend display
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

    setCourses(mockCourses);
    setIsLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Validate time format (24-hour format)
    const timeFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeFormat.test(entry.start_time) || !timeFormat.test(entry.end_time)) {
      toast({
        title: "Invalid time format",
        description: "Please use 24-hour format (e.g., 09:00, 14:30)",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    // Validate end time is after start time
    const startTime = entry.start_time.split(":").map(Number);
    const endTime = entry.end_time.split(":").map(Number);
    const startMinutes = startTime[0] * 60 + startTime[1];
    const endMinutes = endTime[0] * 60 + endTime[1];

    if (endMinutes <= startMinutes) {
      toast({
        title: "Invalid time range",
        description: "End time must be after start time",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      const selectedCourse = courses.find(c => c.id === Number(entry.course_id));
      toast({
        title: "Timetable entry added",
        description: `${selectedCourse?.course_name} added to the timetable on ${entry.day_of_week}`,
      });
      navigate("/admin/dashboard");
    }, 1000);
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (isLoading) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4">Loading courses...</p>
          </div>
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-800">Add Timetable Entry</h1>
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  id="course_id"
                  name="course_id"
                  value={entry.course_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name} ({course.degree})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700">
                  Day of Week
                </label>
                <select
                  id="day_of_week"
                  name="day_of_week"
                  value={entry.day_of_week}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                    Start Time (24h format)
                  </label>
                  <input
                    id="start_time"
                    name="start_time"
                    type="text"
                    placeholder="e.g., 09:00"
                    value={entry.start_time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                    End Time (24h format)
                  </label>
                  <input
                    id="end_time"
                    name="end_time"
                    type="text"
                    placeholder="e.g., 10:30"
                    value={entry.end_time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Add Entry"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AdminProtected>
  );
};

export default AddTimetableEntry;
