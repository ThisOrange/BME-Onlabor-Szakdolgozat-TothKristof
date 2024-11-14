import { useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
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
    const error1 = document.getElementById("missingEmail");
    if (error1 != null) error1.hidden = true;
    const error2 = document.getElementById("wrongEmail");
    if (error2 != null) error2.hidden = true;
    const error3 = document.getElementById("missingPassword");
    if (error3 != null) error3.hidden = true;
    const error4 = document.getElementById("wrongPassword");
    if (error4 != null) error4.hidden = true;
    if (!Email || !Password) {
      // Show error messages if email or password are empty
      if (!Email) {
        if (error1 != null) error1.hidden = false;
      }
      if (!Password) {
        if (error3 != null) error3.hidden = false;
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
        // Handle specific error cases based on the response status
        const errorText = await response.text(); // Retrieve error message from the response
        if (response.status === 404) {
          const error = document.getElementById("wrongEmail");
          if (error != null) error.hidden = false;
        } else if (response.status === 401) {
          const error = document.getElementById("wrongPassword");
          if (error != null) error.hidden = false;
        } else {
          console.error("Login failed:", errorText);
          alert("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
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
              id="missingEmail"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              Missing Email!
            </label>
            <label
              id="wrongEmail"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              User not Found!
            </label>

            <label className=" flex flex-col py-1 text-lg font-bold">
              Password:
              <input
                id="Password"
                type="password"
                className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                onChange={passwordChange}
              ></input>
            </label>
            <label
              id="missingPassword"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              Missing Password!
            </label>
            <label
              id="wrongPassword"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              Wrong Password!
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
