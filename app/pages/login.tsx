import { useState } from "react";
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";

const Login = () => {
  const { handleSubmit } = useForm();
  const [Email, setEmail] = useState<string>();
  const [Password, setPassword] = useState<string>();

  const handleSignup = () => {
    router.push("/");
  };

  const onSubmit = () => {
    console.log(Location);
    if (Email.length && Password.length < 60) {
      //TODO LOGIN
    }

    if (!Email) {
      const error = document.getElementById("errorEmail");
      if (error != null) error.hidden = false;
    }
    if (!Password) {
      const error = document.getElementById("errorPassword");
      if (error != null) error.hidden = false;
    }
  };
  const emailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e: any) => {
    setPassword(e.target.value);
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
