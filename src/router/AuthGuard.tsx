import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/shared/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}
export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) return <Navigate to="/" replace />;

  if (signedIn && !isPrivate) return <Navigate to="/home" replace />;

  return (
    <div className="flex max-w-lg bg-slate-900">
      <Outlet />
    </div>
  );
}
