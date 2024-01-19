import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../view/components/Loading";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  signedIn: boolean;
  signOut(): void;
  signIn(accessToken: string): void;
  user: unknown | undefined;
}
export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem("token");

    return Boolean(storedAccessToken);
  });

  function signIn(accessToken: string) {
    localStorage.setItem("token", accessToken);
    setSignedIn(true);
  }

  function signOut() {
    localStorage.clear();
    setSignedIn(false);
  }

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => (await api.get("/users/me")).data,
    enabled: signedIn,
  });

  useEffect(() => {
    if (isError) signOut();
  }, [isError]);

  if (isFetching) return <Loading isLoading={isFetching} />;

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signIn, signOut, user: data }}
    >
      <Loading isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
