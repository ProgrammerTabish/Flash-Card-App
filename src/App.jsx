import React, { useState } from "react";

const App = () => {
  const [learningWords, setLearningWords] = useState([
    { word: "example", meaning: "a representative form or pattern" },
    { word: "react", meaning: "a JavaScript library for building user interfaces" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newWordsInput, setNewWordsInput] = useState("");

  const currentWord = learningWords[currentIndex];

  // Function to determine the color based on the German article
  const getBackgroundColor = (word) => {
    if (word.startsWith("der ")) {
      return "bg-blue-500"; // Blue for 'der'
    } else if (word.startsWith("die ")) {
      return "bg-pink-500"; // Pink for 'die'
    } else if (word.startsWith("das ")) {
      return "bg-green-500"; // Green for 'das'
    } else {
      return "bg-gray-500"; // Default if no article found
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNextWord = () => {
    setFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * learningWords.length));
  };

  const handleRemoveWord = () => {
    const updatedWords = learningWords.filter((_, index) => index !== currentIndex);
    setLearningWords(updatedWords);
    setCurrentIndex(Math.floor(Math.random() * learningWords.length));
    setFlipped(false);
  };

  const handleAddWords = () => {
    const newWordsArray = newWordsInput
      .split(",") // Split by comma for each word:meaning pair
      .map((pair) => {
        const [word, meaning] = pair.split(":").map((item) => item.trim());
        return { word, meaning };
      });

    setLearningWords(newWordsArray); // Replace the old words with the new ones
    setNewWordsInput(""); // Clear the input box
    setCurrentIndex(0); // Reset index
    setFlipped(false); // Ensure card is not flipped
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
  <div className="mt-4 text-lg text-gray-700">
  Remaining Words: {learningWords.length}
</div>
      <div
        className="relative w-80 h-40 cursor-pointer perspective"
        onClick={handleFlip}
      >
        {/* Flashcard */}
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${flipped ? "rotate-y-180" : ""}`}
        >
          {/* Front Side (Word) */}
          <div
            className={`absolute w-full h-full ${getBackgroundColor(currentWord.word)} text-white text-center flex items-center justify-center ${flipped ? "backface-hidden" : ""}`}
          >
            <h2 className={`text-2xl transition-opacity duration-300 ${flipped ? "opacity-0" : "opacity-100"}`}>
              {currentWord.word}
            </h2>
          </div>

          {/* Back Side (Meaning) */}
          <div
            className={`absolute w-full h-full bg-slate-500 text-white text-center flex items-center justify-center transform rotate-y-180 ${!flipped ? "backface-hidden" : ""}`}
          >
            <p className={`text-lg transition-opacity duration-300 ${!flipped ? "opacity-0" : "opacity-100"}`}>
              {currentWord.meaning}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4">
        <button
          onClick={handleNextWord}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Next Word
        </button>
        <button
          onClick={handleRemoveWord}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove Word
        </button>
      </div>

      {/* Textbox and Button to Add New Words */}
      <div className="mt-6">
        <input
          type="text"
          value={newWordsInput}
          onChange={(e) => setNewWordsInput(e.target.value)}
          placeholder="Enter words as word:meaning, word2:meaning"
          className="border px-4 py-2 w-80 mb-2"
        />
        <button
          onClick={handleAddWords}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Words
        </button>
      </div>

      {/* Message if learningWords is empty */}
      {learningWords.length === 0 && (
        <div className="mt-6 text-2xl text-green-600">
          Well done! You've learned all the words.
        </div>
      )}
    </div>
  );
};

export default App;
