import { useState } from "react";

export default function FilterDropdown({ filterMode, setFilterMode }) {
  return (
    <div className="cursor-pointer absolute flex text-sm flex-col z-100 top-20 right-0 bg-black/50 rounded-xl backdrop-blur-lg w-[20%] h-auto p-1 mx-2 ">
      <button
        className={` ${
          filterMode === "normal" && `bg-gray-200/15`
        } p-1 hover:bg-white/10 my-0.5 w-full text-left rounded-md cursor-pointer`}
        onClick={() => setFilterMode("normal")}
      >
        First created
      </button>
      <button
        className={`${
          filterMode === "closestdue" && `bg-gray-200/15`
        } text-left p-1 hover:bg-white/10 my-0.5 w-full rounded-md cursor-pointer`}
        onClick={() => setFilterMode("closestdue")}
      >
        Closest due date
      </button>
      <button
        className={`${
          filterMode === "farthestdue" && `bg-gray-200/15`
        } text-left p-1 hover:bg-white/10 my-0.5 w-full rounded-md cursor-pointer`}
        onClick={() => setFilterMode("farthestdue")}
      >
        Farthest due date
      </button>
      <button
        className={`${
          filterMode === "alphabetic" && `bg-gray-200/15`
        } text-left p-1 hover:bg-white/10 my-0.5 w-full rounded-md cursor-pointer`}
        onClick={() => setFilterMode("alphabetic")}
      >
        Alphabetic
      </button>
    </div>
  );
}
