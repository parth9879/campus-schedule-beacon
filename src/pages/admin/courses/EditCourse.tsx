
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminProtected from "@/components/AdminProtected";

// Mock courses data
const mockCourses = [
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

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState({
    course_name: "",
    degree: "",
    professor: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundCourse = mockCourses.find((c) => c.id === Number(id));
      if (foundCourse) {
        setCourse({
          course_name: foundCourse.course_name,
          degree: foundCourse.degree,
          professor: foundCourse.professor,
          location: foundCourse.location,
        });
      } else {
        toast({
          title: "Error",
          description: "Course not found",
          variant: "destructive",
        });
        navigate("/admin/dashboard");
      }
      setIsLoading(false);
    }, 500);
  }, [id, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Course updated",
        description: `${course.course_name} has been updated successfully`,
      });
      navigate("/admin/dashboard");
    }, 1000);
  };

  // Predefined degree options
  const degreeOptions = [
    "Computer Science",
    "Political Science",
    "MBBS",
    "Civil Engineering",
  ];

  if (isLoading) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4">Loading course data...</p>
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
              <h1 className="text-2xl font-bold text-blue-800">Edit Course</h1>
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="course_name" className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  id="course_name"
                  name="course_name"
                  type="text"
                  value={course.course_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                  Degree Program
                </label>
                <select
                  id="degree"
                  name="degree"
                  value={course.degree}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {degreeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
                  Professor
                </label>
                <input
                  id="professor"
                  name="professor"
                  type="text"
                  value={course.professor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={course.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
                    "Update Course"
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

export default EditCourse;
