// context/LoginContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the context
interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Create the context with default values
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

// Provider component to wrap the app
interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};
