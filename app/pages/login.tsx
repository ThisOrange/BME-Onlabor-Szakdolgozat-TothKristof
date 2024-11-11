import { useState } from "react";
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { useLoginContext } from "../src/components/LoginContext";

const Login = () => {
  const { setIsLoggedIn } = useLoginContext();
  const { handleSubmit } = useForm();
  const [Email, setEmail] = useState<string>();
  const [Password, setPassword] = useState<string>();

  const handleSignup = () => {
    router.push("/signup");
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  interface JwtPayload {
    sub: string; // The username or subject
    role: string; // The role field (which you'll add on the backend)
    userId: string;
    Name: string;
  }

  const onSubmit = async () => {
    if (!Email || !Password) {
      // Show error messages if email or password are empty
      if (!Email) {
        const error = document.getElementById("errorEmail");
        if (error != null) error.hidden = false;
      }
      if (!Password) {
        const error = document.getElementById("errorPassword");
        if (error != null) error.hidden = false;
      }
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/auth/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Email, password: Password }),
        }
      );

      if (response.ok) {
        const textResponse = await response.text(); // Get the raw response as text
        console.log("Response from server:", textResponse);

        // Now handle the token properly, assuming it's a plain JWT string
        const token = textResponse; // This assumes the token is returned as a string in the response body

        // Save JWT token to local storage
        localStorage.setItem("jwtToken", token);

        // Decode the token to get username and role
        const decodedToken = jwtDecode<JwtPayload>(token);
        const username = decodedToken.Name; // assuming 'sub' is used for the username
        const role = decodedToken.role;
        const email = decodedToken.sub;
        const userId = decodedToken.userId;

        // Save username and role in local storage
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        router.push("/");

        // Redirect to a protected route or update UI
        console.log(
          "Login successful. User:",
          localStorage.getItem("username"),
          "Role:",
          localStorage.getItem("role")
        );
      } else {
        // If the login failed, log the response as text for debugging
        const errorText = await response.text();
        console.error("Login failed:", errorText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="w-96 flex flex-col justify-around">
        <p className="flex justify-center  text-5xl text-emerald-400 font-bold">
          Welcome
        </p>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-10 flex flex-col justify-center"
          >
            <label className=" flex flex-col py-1 text-lg font-bold">
              Email:
              <input
                id="Email"
                className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                onChange={emailChange}
              ></input>
            </label>
            <label
              id="errorEmail"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              Missing Email!
            </label>

            <label className=" flex flex-col py-1 text-lg font-bold">
              Password:
              <input
                id="Password"
                className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                onChange={passwordChange}
              ></input>
            </label>
            <label
              id="errorPassword"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              Missing Password!
            </label>
            <div>
              <label id="errorPassword" className="">
                Don't have an account?
              </label>
              <a
                onClick={handleSignup}
                className=" text-primary-white_gray font-bold hover clickable"
              >
                {" "}
                Sign up
              </a>
            </div>
            <input
              type="submit"
              id="Login"
              value="LOGIN"
              className=" my-10 h-12 px-2 py-1 rounded-md outline-emerald-400 bg-emerald-400 text-2xl font-bold cursor-pointer"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
