import { useRouter } from "next/router";
import { useLoginContext } from "../src/components/LoginContext";

const Profile = () => {
  const { setIsLoggedIn } = useLoginContext();
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("jwtToken");

    // Optionally, you can also reset any other application state here (e.g., isLoggedIn).

    // Redirect to the login page
    setIsLoggedIn(false);
    router.push("/"); // Or any other route like "/"
  };

  return (
    <div className="flex flex-row justify-center text-slate-800">
      <div className="restaurant-container bg-white">
        <h1 className="text-center">
          Welcome {localStorage.getItem("username")}!
        </h1>
        <label className="block text-xl font-bold">
          Email: {localStorage.getItem("email")}
        </label>
        <label className="block text-xl font-bold">
          Role: {localStorage.getItem("role")}
        </label>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
