import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="text-center space-y-6 p-8 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Package className="w-12 h-12 text-primary" />
          <h1 className="text-5xl font-bold text-primary">Campus Connect</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          Lost & Found Management System for your campus
        </p>
        <div className="flex items-center justify-center gap-4">
          <Search className="w-6 h-6 text-primary" />
          <p className="text-lg">Find what you've lost. Return what you've found.</p>
        </div>
        <Button size="lg" onClick={() => navigate("/auth")} className="mt-6">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
