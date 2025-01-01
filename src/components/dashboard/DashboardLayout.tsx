import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Property Dashboard</h1>
            <nav className="ml-6 space-x-4">
              <Link
                to="/dashboard"
                className={`text-sm ${
                  location.pathname === "/dashboard"
                    ? "text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Properties
              </Link>
              <Link
                to="/dashboard/settings"
                className={`text-sm ${
                  location.pathname === "/dashboard/settings"
                    ? "text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Settings
              </Link>
            </nav>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;