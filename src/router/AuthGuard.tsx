import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}
export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) return <Navigate to="/" replace />;

  if (signedIn && !isPrivate) return <Navigate to="/home" replace />;

  return <Outlet />;
}
