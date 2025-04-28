
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import AdminProtected from "@/components/AdminProtected";

const AddCourse = () => {
  const [course, setCourse] = useState({
    course_name: "",
    degree: "",
    professor: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Course added",
        description: `${course.course_name} has been added successfully`,
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

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-800">Add New Course</h1>
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
                  <option value="" disabled>Select a degree program</option>
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Add Course"
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

export default AddCourse;
