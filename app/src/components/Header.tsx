import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLoginContext } from "../components/LoginContext"; // Import the useLoginContext hook

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext(); // Access context values
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && isLoggedIn) {
      const newButton = document.getElementById("AddRestaurant");

      if (localStorage.getItem("role") === "RESTOWNER") {
        if (newButton) newButton.hidden = false;
      }
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || "");
    } else {
      setUsername("");
      const newButton = document.getElementById("AddRestaurant");
      if (newButton) newButton.hidden = true;
    }
  }, [isLoggedIn]); // Dependency on isLoggedIn

  const loginClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      router.push("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="header z-50">
      <div className="h-16 w-full flex justify-between items-center bg-slate-800 border border-slate-600 top-0 z-50">
        <div className="flex">
          <input
            className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
            type="button"
            value="Search"
            onClick={() => router.push("/")}
          />
          <input
            className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
            type="button"
            value="About"
            onClick={() => router.push("/about")}
          />
          <input
            id="AddRestaurant"
            className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
            type="button"
            value="Add Restaurant"
            hidden={true}
            onClick={() => router.push("/new")}
          />
        </div>
        <input
          className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
          type="button"
          value={isLoggedIn ? username : "Login"}
          onClick={loginClick}
        />
      </div>
    </div>
  );
};

export default Header;
