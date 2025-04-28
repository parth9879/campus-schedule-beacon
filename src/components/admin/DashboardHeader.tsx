
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onLogout: () => void;
}

const DashboardHeader = ({ onLogout }: DashboardHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Link to="/">
          <Button variant="outline" className="border-blue-500 text-blue-500">
            View Public Site
          </Button>
        </Link>
        <Button variant="destructive" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
