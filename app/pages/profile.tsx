import { useRouter } from "next/router";
import { useLoginContext } from "../src/components/LoginContext";
import { useEffect, useState } from "react";
import CommentsList from "../src/components/comment/CommentList";

const Profile = () => {
  const { setIsLoggedIn } = useLoginContext();
  const router = useRouter();
  const [comments, setComments] = useState<CommentData[]>([]);

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

  const getComments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/user/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result: CommentData[] = await response.json();
      setComments(result);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

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
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <h2>My reviews:</h2>
        <div className="mt-4 px-10 w-full">
          {comments.length > 0 ? (
            <CommentsList comments={comments} />
          ) : (
            <p>There are no reviews yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
