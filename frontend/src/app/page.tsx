import Dashboard from "@/components/dashboard/dashboard";
import { ProtectedRoute } from "@/components/auth";

/**
 * DashboardPage - Main dashboard route component
 * 
 * This is the Next.js page component that renders the Dashboard.
 * Keeps the page component clean and delegates to the actual Dashboard component.
 */
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
