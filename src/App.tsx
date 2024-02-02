import { Router } from "./router";
import { AuthProvider } from "./app/shared/contexts/AuthContext";
import { MonthProvider } from "./app/shared/contexts/MonthContext";
import { ToggleProvider } from "./app/shared/contexts/ToggleContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <MonthProvider>
            <Router />
          </MonthProvider>
        </ToggleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
