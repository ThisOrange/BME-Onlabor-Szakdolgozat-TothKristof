import Link from "next/link";
import { useRouter } from "next/router";
function Header() {
  const router = useRouter();

  const searchClick = () => {
    router.push("/");
  };
  const aboutClick = () => {
    router.push("/about");
  };
  const newClick = () => {
    router.push("/new");
  };
  const loginClick = () => {
    router.push("/login");
  };

  return (
    <div className="App">
      <div className="h-16 w-full flex justify-between items-center bg-slate-800 border border-slate-600">
        <div className="flex">
          <input
            className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
            type="button"
            value="Search"
            onClick={searchClick}
          />
          <input
            className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
            type="button"
            value="About"
            onClick={aboutClick}
          />
          <input
            className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
            type="button"
            value="New"
            onClick={newClick}
          />
        </div>
        <input
          className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
          type="button"
          value="Login"
          onClick={loginClick}
        />
      </div>
    </div>
  );
}

export default Header;
