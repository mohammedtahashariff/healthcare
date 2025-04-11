
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <p className="text-xl text-gray-800 mb-6">Page not found</p>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-primary hover:bg-primary-dark">
          <a href="/" className="flex items-center">
            <Home className="h-4 w-4 mr-2" /> Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
