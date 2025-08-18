import Analytics from "@/components/analytics/analytics";
import { ProtectedRoute } from "@/components/auth";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  );
}
