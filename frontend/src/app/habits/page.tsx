import Habits from "@/components/habits/habits";
import { ProtectedRoute } from "@/components/auth";

export default function HabitsPage() {
  return (
    <ProtectedRoute>
      <Habits />
    </ProtectedRoute>
  );
}
