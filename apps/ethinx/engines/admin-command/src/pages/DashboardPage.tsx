import { Dashboard } from "@/components/Dashboard";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Dashboard />;
}
