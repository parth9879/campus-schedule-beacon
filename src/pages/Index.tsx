
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">University Timetable Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access class schedules and manage university timetables in one place
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Students</h2>
            <p className="text-gray-600 mb-6">
              View your class schedules organized by day and time. Filter by degree program to find relevant courses.
            </p>
            <Link to="/timetable">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">
                View Timetable
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Administrators</h2>
            <p className="text-gray-600 mb-6">
              Log in to manage course information, schedule classes, and update timetable entries.
            </p>
            <Link to="/admin/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} University Timetable Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
