
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";

// Types
interface Course {
  id: number;
  course_name: string;
  degree: string;
  professor: string;
  location: string;
}

interface CourseTableProps {
  courses: Course[];
  isLoading: boolean;
  onDeleteCourse: (id: number) => void;
}

const CourseTable = ({ courses, isLoading, onDeleteCourse }: CourseTableProps) => {
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Professor</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.course_name}</TableCell>
                <TableCell>{course.degree}</TableCell>
                <TableCell>{course.professor}</TableCell>
                <TableCell>{course.location}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link to={`/admin/courses/edit/${course.id}`}>
                      <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onDeleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No courses available. Add a course to get started.</p>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
