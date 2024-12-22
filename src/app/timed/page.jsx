"use client";
import { useState } from "react";
import Game from "@/components/game";

const Page = () => {
  const [gridSize, setGridSize] = useState(4);

  const handleGridSizeChange = (size) => {
    setGridSize(size);
  };

  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-gray-900 to-gray-700 text-white min-h-screen">
      <div className="mt-4">
        <button
          onClick={() => handleGridSizeChange(2)}
          className={`py-2 px-4 mx-2 ${
            gridSize === 2 ? "bg-gray-600 text-white" : "bg-black"
          } rounded  hover:scale-105 transition duration-500`}
        >
          2x2
        </button>
        <button
          onClick={() => handleGridSizeChange(4)}
          className={`py-2 px-4 mx-2 ${
            gridSize === 4 ? "bg-gray-600 text-white" : "bg-black"
          } rounded  hover:scale-105 transition duration-500`}
        >
          4x4
        </button>
        <button
          onClick={() => handleGridSizeChange(6)}
          className={`py-2 px-4 mx-2 ${
            gridSize === 6 ? "bg-gray-600 text-white" : "bg-black"
          } rounded  hover:scale-105 transition duration-500`}
        >
          6x6
        </button>
      </div>
      <Game gridSize={gridSize} />
    </div>
  );
};

export default Page;
