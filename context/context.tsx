import { ContextType, createContext, useState } from "react";

export type User = {
  id: number;
  user_id: string;
  user_email: string;
  user_role: string;
  user_country: string;
  user_profile_id: number;
  user_role_id: number;
};

export const UserContext = createContext<any>({});

type ProviderType = {
  children: React.ReactNode;
};

export function UserProvider({ children }: ProviderType) {
  const [user, setUser] = useState<User | null>(null);

  const getUserLoggedIn = (user: User) => {
    setUser((prevUser) => {
      prevUser = user;

      return prevUser;
    });
  };
  return (
    <UserContext.Provider value={{ getUserLoggedIn, user }}>
      {children}
    </UserContext.Provider>
  );
}
