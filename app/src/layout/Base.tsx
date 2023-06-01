import Header from "../components/Header";

export const Base = ({ children }: any) => {
  
    return (
      <div className="antialiase">
        <title>AllergenTracker</title>
        <Header />
        {children}
      </div>
    );
  };