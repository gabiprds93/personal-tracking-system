import Profile from "@/components/profile/profile";
import { ProtectedRoute } from "@/components/auth";

/**
 * ProfilePage - Profile route component
 * 
 * This is the Next.js page component that renders the Profile.
 * Keeps the page component clean and delegates to the actual Profile component.
 */
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
