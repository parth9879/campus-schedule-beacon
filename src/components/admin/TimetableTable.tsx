
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

interface TimetableEntry {
  id: number;
  course_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

interface TimetableTableProps {
  timetableEntries: TimetableEntry[];
  courses: Course[];
  isLoading: boolean;
  onDeleteTimetableEntry: (id: number) => void;
}

const TimetableTable = ({ 
  timetableEntries, 
  courses, 
  isLoading, 
  onDeleteTimetableEntry 
}: TimetableTableProps) => {
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading timetable entries...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timetableEntries.map((entry) => {
              const course = courses.find(c => c.id === entry.course_id);
              return (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {course ? course.course_name : "Unknown Course"}
                  </TableCell>
                  <TableCell>{entry.day_of_week}</TableCell>
                  <TableCell>{entry.start_time}</TableCell>
                  <TableCell>{entry.end_time}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/admin/timetable/edit/${entry.id}`}>
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => onDeleteTimetableEntry(entry.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {timetableEntries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No timetable entries available. Add an entry to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TimetableTable;
