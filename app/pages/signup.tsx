import { useState } from "react";
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { useLoginContext } from "../src/components/LoginContext";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const { setIsLoggedIn } = useLoginContext();
  const { handleSubmit } = useForm();
  const [Email, setEmail] = useState<string>();
  const [Password, setPassword] = useState<string>();
  const [Role, setRole] = useState<boolean>();
  const [Username, setUsername] = useState<string>();
  const [VerifyPassword, setVerifyPassword] = useState<string>();

  const verifyPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyPassword(e.target.value);
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const roleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.checked);
  };

  interface JwtPayload {
    sub: string;
    role: string;
    Name: string;
    userId: string;
  }

  const onSubmit = async () => {
    const error1 = document.getElementById("missingEmail");
    if (error1 != null) error1.hidden = true;
    const error2 = document.getElementById("missingPassword");
    if (error2 != null) error2.hidden = true;
    const error3 = document.getElementById("missingUsername");
    if (error3 != null) error3.hidden = true;
    const error4 = document.getElementById("activeEmail");
    if (error4 != null) error4.hidden = true;
    const error5 = document.getElementById("missingVerifyPassword");
    if (error5 != null) error5.hidden = true;
    const error6 = document.getElementById("wrongVerifyPassword");
    if (error6 != null) error6.hidden = true;
    const error7 = document.getElementById("invalidEmail");
    if (error7 != null) error7.hidden = true;

    if (!Email || !Password || !VerifyPassword) {
      if (!Email) {
        if (error1 != null) error1.hidden = false;
      }
      if (!Password) {
        if (error2 != null) error2.hidden = false;
      }
      if (!Username) {
        if (error3 != null) error3.hidden = false;
      }
      if (!VerifyPassword) {
        if (error5 != null) error5.hidden = false;
      }
      return;
    }
    if (VerifyPassword != Password) {
      if (error6 != null) error6.hidden = false;
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(Email)) {
      if (error7 != null) error7.hidden = false;
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: Username,
            email: Email,
            password: Password,
            role: Role,
          }),
        }
      );

      if (response.ok) {
        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/auth/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Email, password: Password }),
          }
        );

        if (loginResponse.ok) {
          const textResponse = await loginResponse.text(); // Get the raw response as text
          console.log("Login successful:", textResponse);

          // Handle the JWT token and store it
          const token = textResponse; // This assumes the token is returned as a string in the response body
          localStorage.setItem("jwtToken", token);

          // Decode the token to get user information
          const decodedToken = jwtDecode<JwtPayload>(token);
          const username = decodedToken.Name;
          const role = decodedToken.role;
          const email = decodedToken.sub;
          const userId = decodedToken.userId;

          // Save username and role in local storage
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);
          localStorage.setItem("email", email);
          localStorage.setItem("userId", userId);
          setIsLoggedIn(true);
          router.push("/");

          console.log("Login successful. User:", username, "Role:", role);
        } else {
          const errorText = await loginResponse.text();
          console.error("Login failed:", errorText);
        }
      } else {
        // Handle specific error cases based on the response status
        const errorText = await response.text(); // Retrieve error message from the response
        if (response.status === 401) {
          const error = document.getElementById("activeEmail");
          if (error != null) error.hidden = false;
        } else {
          console.error("Registration failed:", errorText);
          alert("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative my-10 flex justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-96 px-2 py-1 rounded-md outline-slate-800 bg-slate-800 text-2xl font-bold cursor-pointer flex items-center"
      >
        <FaArrowLeft className="mx-2 text-white" />
      </button>
      <div className="my-10 flex justify-center ">
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
                Username:
                <input
                  id="Username"
                  type="username"
                  className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                  onChange={usernameChange}
                ></input>
              </label>
              <label
                id="missingUsername"
                className=" text-red-500 font-bold"
                hidden={true}
              >
                Missing Username!
              </label>
              <label className=" flex flex-col py-1 text-lg font-bold">
                Email:
                <input
                  id="Email"
                  type=""
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
                id="activeEmail"
                className=" text-red-500 font-bold"
                hidden={true}
              >
                Email already in use!
              </label>
              <label
                id="invalidEmail"
                className=" text-red-500 font-bold"
                hidden={true}
              >
                Enter a valid Email!
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
              <label className=" flex flex-col py-1 text-lg font-bold">
                Verify Password:
                <input
                  id="VerifyPassword"
                  type="password"
                  className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                  onChange={verifyPasswordChange}
                ></input>
              </label>
              <label
                id="missingVerifyPassword"
                className=" text-red-500 font-bold"
                hidden={true}
              >
                Missing Verification!
              </label>
              <label
                id="wrongVerifyPassword"
                className=" text-red-500 font-bold"
                hidden={true}
              >
                The two passwords don't match!
              </label>
              <div className="flex">
                <input
                  type="checkbox"
                  id="Role"
                  className=""
                  onChange={(e) => roleChange(e)}
                ></input>
                <h4 className="mx-2 font-semibold">
                  I'm a restaurant owner! (Limited user priviliges, access to
                  restaurant management)
                </h4>
              </div>

              <input
                type="submit"
                id="SignUp"
                value="Sign Up"
                className=" my-10 h-12 px-2 py-1 rounded-md outline-emerald-400 bg-emerald-400 text-2xl font-bold cursor-pointer"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
