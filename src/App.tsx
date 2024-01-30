import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./app/shared/contexts/AuthContext";
import { Router } from "./router";
import { ToggleProvider } from "./app/shared/contexts/ToggleContext";

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToggleProvider>
          <Router />
        </ToggleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
