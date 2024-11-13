import { jwtDecode } from "jwt-decode";
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

interface JwtPayload {
  exp: string;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const isExpired = parseInt(decodedToken.exp, 10) * 1000 < Date.now();
        if (isExpired) {
          setIsLoggedIn(false);
          localStorage.removeItem("jwtToken");
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token format", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkTokenExpiration();
      const storedValue = localStorage.getItem("isLoggedIn");
      if (storedValue !== null) {
        setIsLoggedIn(JSON.parse(storedValue));
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }
  }, [isLoggedIn]);

  // Re-run token expiration check every minute
  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
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
