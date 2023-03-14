import Header from "../components/Header";

export const Base = ({ children }: any) => {
  
    return (
      <div className="antialiase">
        <Header />
        {children}
      </div>
    );
  };