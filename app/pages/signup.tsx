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
  const [Role, setRole] = useState<boolean>();
  const [Username, setUsername] = useState<string>();

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
    setRole(e.target.checked); // Sets role to true if checked, false if unchecked
  };

  interface JwtPayload {
    sub: string; // The username or subject
    role: string; // The role field (which you'll add on the backend)
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
        // Automatically login after registration is successful
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

          // Save username and role in local storage
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);
          localStorage.setItem("email", email);
          setIsLoggedIn(true);
          router.push("/");

          console.log("Login successful. User:", username, "Role:", role);
        } else {
          const errorText = await loginResponse.text();
          console.error("Login failed:", errorText);
        }
      } else {
        const errorText = await response.text();
        console.error("Registration failed:", errorText);
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
              Username:
              <input
                id="Username"
                className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                onChange={usernameChange}
              ></input>
            </label>
            <label
              id="errorPassword"
              className=" text-red-500 font-bold"
              hidden={true}
            >
              Missing Password!
            </label>
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
            <input
              type="checkbox"
              id="Role"
              onChange={(e) => roleChange(e)}
            ></input>
            <label htmlFor="Role" className="mx-2">
              Role{" "}
            </label>

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
  );
};

export default Login;
