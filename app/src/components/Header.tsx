import Link from "next/link";
import { useRouter } from "next/router";
function Header(){
  const router = useRouter();

  const searchClick = () => {
    router.push('/');
  };
  const aboutClick = () => {
    router.push('/about');
  };
  const newClick = () => {
    router.push('/new');
  };

return(
    <div className="App">
    <div >
      <rect className=" h-16 flex justify-start  bg-slate-800 background-color-black">
    <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
        type="button"
        value="Search"
        onClick={searchClick}
      ></input>
      <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
        type="button"
        value="About"
        onClick={aboutClick}
      ></input>
      <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
        type="button"
        value="New"
        onClick={newClick}
      ></input>
      </rect>
    </div>
  </div>
)
}

export default Header;