
import { useState, useEffect } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  course: Course;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

const Timetable = () => {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([]);
  const [filteredData, setFilteredData] = useState<TimetableEntry[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

    const mockTimetable: TimetableEntry[] = [
      { id: 1, course_id: 1, course: mockCourses[0], day_of_week: "Monday", start_time: "09:00", end_time: "10:30" },
      { id: 2, course_id: 2, course: mockCourses[1], day_of_week: "Monday", start_time: "11:00", end_time: "12:30" },
      { id: 3, course_id: 3, course: mockCourses[2], day_of_week: "Tuesday", start_time: "09:00", end_time: "11:00" },
      { id: 4, course_id: 4, course: mockCourses[3], day_of_week: "Tuesday", start_time: "13:00", end_time: "14:30" },
      { id: 5, course_id: 5, course: mockCourses[4], day_of_week: "Wednesday", start_time: "09:00", end_time: "10:30" },
      { id: 6, course_id: 6, course: mockCourses[5], day_of_week: "Wednesday", start_time: "11:00", end_time: "13:00" },
      { id: 7, course_id: 7, course: mockCourses[6], day_of_week: "Thursday", start_time: "09:00", end_time: "11:00" },
      { id: 8, course_id: 8, course: mockCourses[7], day_of_week: "Thursday", start_time: "13:00", end_time: "15:00" },
      { id: 9, course_id: 9, course: mockCourses[8], day_of_week: "Friday", start_time: "10:00", end_time: "12:00" },
    ];

    // Extract unique degrees
    const uniqueDegrees = Array.from(new Set(mockCourses.map(course => course.degree)));
    
    setTimetableData(mockTimetable);
    setFilteredData(mockTimetable);
    setDegrees(uniqueDegrees);
    setIsLoading(false);
  }, []);

  // Filter timetable data by degree
  const handleDegreeChange = (value: string) => {
    setSelectedDegree(value);
    
    if (value === "") {
      setFilteredData(timetableData);
    } else {
      const filtered = timetableData.filter(entry => entry.course.degree === value);
      setFilteredData(filtered);
    }
  };

  // Group timetable entries by day
  const groupedByDay: Record<string, TimetableEntry[]> = filteredData.reduce((acc, entry) => {
    if (!acc[entry.day_of_week]) {
      acc[entry.day_of_week] = [];
    }
    acc[entry.day_of_week].push(entry);
    return acc;
  }, {} as Record<string, TimetableEntry[]>);

  // Sort days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const sortedDays = Object.keys(groupedByDay).sort((a, b) => days.indexOf(a) - days.indexOf(b));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">University Timetable</h1>
          <Link to="/">
            <Button variant="outline" className="border-blue-500 text-blue-500">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Degree
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedDegree}
              onChange={(e) => handleDegreeChange(e.target.value)}
            >
              <option value="">All Degrees</option>
              {degrees.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading timetable...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDays.map((day) => (
              <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="bg-blue-700 text-white px-6 py-3 text-lg font-semibold">{day}</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedByDay[day]
                        .sort((a, b) => a.start_time.localeCompare(b.start_time))
                        .map((entry) => (
                          <tr key={entry.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {entry.start_time} - {entry.end_time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {entry.course.course_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.course.degree}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.course.professor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.course.location}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredData.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No timetable entries found for the selected degree.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetable;
