import Link from "next/link";
function Header(){
return(
    <div className="App">
    <div >
      <rect className=" h-16 flex justify-start  bg-slate-800 background-color-black">
        <Link href="/">
    <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
        type="button"
        value="Search"
      ></input>
      </Link>
      <Link href="/about">
      <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
        type="button"
        value="About"
      ></input>
      </Link>
      <Link href="/new">
      <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-400 hover:outline"
        type="button"
        value="New"
      ></input>
      </Link>
      </rect>
    </div>
  </div>
)
}

export default Header;