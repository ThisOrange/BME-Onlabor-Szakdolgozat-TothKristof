import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  // Initialize isLoggedIn as undefined initially
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // This will only run on the client side (after the component mounts)
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isLoggedIn");
      if (storedValue !== null) {
        setIsLoggedIn(JSON.parse(storedValue)); // Update state based on localStorage
      } else {
        setIsLoggedIn(false); // Set to false if not found in localStorage
      }
    }
  }, []); // Runs only once when the component mounts

  // This effect updates localStorage when the `isLoggedIn` state changes
  useEffect(() => {
    if (isLoggedIn !== undefined) {
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      }
    }
  }, [isLoggedIn]); // Only run when isLoggedIn changes

  // If `isLoggedIn` is undefined, show a loading state until the check is complete
  if (isLoggedIn === undefined) {
    return <div>Loading...</div>; // Or any other loading UI
  }

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
