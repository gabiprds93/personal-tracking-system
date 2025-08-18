import Goals from "@/components/goals/goals";
import { ProtectedRoute } from "@/components/auth";

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <Goals />
    </ProtectedRoute>
  );
}
