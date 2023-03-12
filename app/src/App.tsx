import React from 'react';

const App = () =>{
  return (
    <div className="App">
    <div >
      <rect className=" h-16 flex justify-start  bg-slate-800 background-color-black">
    <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-500 hover:outline"
        type="button"
        value="Search"
      ></input>
      <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-500 hover:outline"
        type="button"
        value="About"
      ></input>
      <input
        className="mx-1 my-1 w-36 h-14 text-white text-center text-xl bg-slate-800 cursor-pointer outline-emerald-500 hover:outline"
        type="button"
        value="New"
      ></input>
      </rect>
    </div>
  </div>
  );
}

export default App;
