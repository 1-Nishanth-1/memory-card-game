"use client";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold">Memory Card game</h1>

      <main className="flex flex-col gap-12 row-start-2 items-center sm:items-start w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full">
          <a
            href="/practise"
            className="bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-700 transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-4">Classic Mode</h2>
            <p className="text-gray-400 mb-4">No timer, Practice</p>
          </a>

          <a
            href="/timed"
            className="bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-700 transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-4">Time Attack</h2>
            <p className="text-gray-400 mb-4">With Timer</p>
          </a>

          <a
            href="/multiplayer"
            className="bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-700 transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-4">Multiplayer</h2>
            <p className="text-gray-400 mb-4">Challenge your friends</p>
          </a>
        </div>
      </main>
    </div>
  );
}
