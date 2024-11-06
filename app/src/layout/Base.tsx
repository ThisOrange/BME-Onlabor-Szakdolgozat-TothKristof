import { ReactNode, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Login from "../../pages/login";
import { LoginProvider } from "../components/LoginContext";

interface BaseProps {
  children: React.ReactNode;
}

export const Base = ({ children }: BaseProps) => {
  return (
    <LoginProvider>
      <div className="antialiase">
        <title>AllergenTracker</title>
        <Header />
        {children}
      </div>
    </LoginProvider>
  );
};
