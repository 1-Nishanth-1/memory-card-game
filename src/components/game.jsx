"use client";
import { useState, useEffect } from "react";
import "./styles.css";

export default function Game({ gridSize }) {
  const flipSound = new Audio("/sound/flipcard-91468.mp3");
  const winSound = new Audio("/sound/success-1-6297.mp3");
  const matchSound = new Audio(
    "/sound/mixkit-quick-win-video-game-notification-269.wav"
  );

  // Check if the URL contains "timed" or "practise" mode
  const isTimedMode =
    typeof window !== "undefined" && window.location.pathname.includes("timed");
  const isPractiseMode =
    typeof window !== "undefined" &&
    window.location.pathname.includes("practise");

  const emojiSets = {
    animals: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🐻",
      "🦊",
      "🦄",
      "🐯",
      "🦓",
      "🦒",
      "🐘",
      "🦢",
      "🦜",
      "🦋",
      "🐨",
      "🐼",
      "🦝",
    ],
    symbols: [
      "❤️",
      "🌈",
      "🔥",
      "🍀",
      "🎉",
      "🎁",
      "✨",
      "🐱",
      "🐶",
      "🦄",
      "🦋",
      "🌸",
      "💎",
      "🍄",
      "💫",
      "🎵",
      "🦜",
      "🐼",
    ],
    numbers: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
    ],
  };

  const generateCards = (emojiSet) => {
    const totalCards = gridSize * gridSize;
    const cardValues = emojiSets[emojiSet].slice(0, totalCards / 2);
    const cards = cardValues
      .flatMap((value) => [
        { id: `${value}-1`, value, isMatched: false },
        { id: `${value}-2`, value, isMatched: false },
      ])
      .sort(() => Math.random() - 0.5);
    return cards;
  };

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hasFirstMove, setHasFirstMove] = useState(false);
  const [selectedSet, setSelectedSet] = useState("animals");

  useEffect(() => {
    setCards(generateCards(selectedSet));
    setMatchedCount(0);
    setFlippedCards([]);
    setTimer(0);
    setIsTimerRunning(false);
    setHasFirstMove(false);
  }, [gridSize, selectedSet]);

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].isMatched) return;

    if (isTimedMode && !hasFirstMove) {
      setHasFirstMove(true);
      setIsTimerRunning(true);
    }

    flipSound.play();

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;

      if (
        cards[firstIndex].value === cards[secondIndex].value &&
        firstIndex !== secondIndex
      ) {
        setCards((prevCards) =>
          prevCards.map((card, idx) =>
            idx === firstIndex || idx === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedCount((prevCount) => prevCount + 2);
        setFlippedCards([]);
        setTimeout(() => matchSound.play(), 400);

        if (matchedCount + 2 === gridSize * gridSize) {
          setTimeout(() => {
            winSound.play();
            setIsTimerRunning(false);
          }, 500);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards(generateCards(selectedSet));
    setFlippedCards([]);
    setMatchedCount(0);
    setTimer(0);
    setIsTimerRunning(false);
    setHasFirstMove(false);
  };

  const totalCards = gridSize * gridSize;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleMode = () => {
    const newMode = isTimedMode ? "practise" : "timed";
    window.history.replaceState(
      {},
      "",
      window.location.pathname.replace(
        isTimedMode ? "timed" : "practise",
        newMode
      )
    );
    window.location.reload();
  };

  return (
    <>
      <div className="mt-4">
        <button
          onClick={() => setSelectedSet("animals")}
          className={`py-2 px-4 mx-2 ${
            selectedSet === "animals" ? "bg-gray-600 text-white" : "bg-black"
          } rounded  hover:scale-105 transition duration-500`}
        >
          Animals
        </button>
        <button
          onClick={() => setSelectedSet("symbols")}
          className={`py-2 px-4 mx-2 ${
            selectedSet === "symbols" ? "bg-gray-600 text-white" : "bg-black"
          } rounded  hover:scale-105 transition duration-500`}
        >
          Symbols
        </button>
        <button
          onClick={() => setSelectedSet("numbers")}
          className={`py-2 px-4 mx-2 ${
            selectedSet === "numbers" ? "bg-gray-600 text-white" : "bg-black"
          } rounded  hover:scale-105 transition duration-500`}
        >
          Numbers
        </button>
      </div>
      <h1 className="text-center text-2xl font-bold my-4">
        {gridSize}x{gridSize} Memory Card Game
      </h1>
      <div className="text-center mb-4">
        <p>
          Matched Cards: {matchedCount} / {totalCards}
        </p>
        {isTimedMode && <p>Time: {formatTime(timer)}</p>}
        {matchedCount === totalCards && (
          <p className="text-green-500 font-bold text-xl">You Win! 🎉</p>
        )}
        <button
          onClick={handleRestart}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:scale-105 transition duration-500"
        >
          Restart Game
        </button>
        <button
          onClick={toggleMode}
          className="bg-yellow-500 text-white py-2 px-4 rounded mt-4 ml-4 hover:scale-105 transition duration-00"
        >
          Switch to {isTimedMode ? "Practise" : "Timed"} Mode
        </button>
      </div>
      <div
        className="grid gap-4 place-items-center p-4 mx-auto m-6"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(${gridSize * 9.5}rem, 95%)`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="sm:w-32 w-14 h-20 sm:h-40 perspective"
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform rounded-2xl text-4xl  ${
                flippedCards.includes(index) || card.isMatched
                  ? "rotate-y-180"
                  : ""
              }`}
            >
              <div className="absolute w-full h-full bg-blue-500 text-white flex items-center rounded-2xl justify-center backface-hidden">
                ?
              </div>
              <div className="absolute w-full h-full bg-green-500 text-white flex items-center rounded-2xl justify-center backface-hidden rotate-y-180">
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
