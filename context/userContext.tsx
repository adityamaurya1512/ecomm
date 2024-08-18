// context/UserContext.tsx
"use client"
import { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  email: string;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component that wraps around children and provides the email
export const UserProvider = ({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) => {
  return (
    <UserContext.Provider value={{ email }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
