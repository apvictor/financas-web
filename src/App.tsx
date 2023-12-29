import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router";
import { AuthProvider } from "./shared/contexts/AuthContext";

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
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}
