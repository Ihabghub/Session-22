import React, { useEffect, useState } from 'react';
import useProgressStore from './Store';

// Emoji set for rotating every second
const emojis = ['🌟', '🍉', '🦄', '🎈', '🌈', '🚀', '🐉', '🎨'];

const ProgressBar = () => {
  const { progress, increaseProgress, isDone, setDone, resetProgress, hasStarted, startProgress } = useProgressStore();
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    let progressInterval;
    if (hasStarted && !isDone) {
      progressInterval = setInterval(() => {
        increaseProgress();
      }, 1000);
    }
    return () => clearInterval(progressInterval);
  }, [increaseProgress, isDone, hasStarted]);

  useEffect(() => {
    let emojiInterval;
    if (hasStarted && !isDone) {
      emojiInterval = setInterval(() => {
        setEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
      }, 1000);
    }
    return () => clearInterval(emojiInterval);
  }, [isDone, hasStarted]);

  useEffect(() => {
    if (progress >= 10) {
      setDone();
    }
  }, [progress, setDone]);

  useEffect(() => {
    resetProgress(); // Consider when to call this to avoid unwanted resets
  }, [resetProgress]); // This effect will run on every render

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 flex justify-center rounded-lg shadow-lg max-w-md w-full">
        {!hasStarted && !isDone && (
          <button
            onClick={startProgress}
            className="bg-blue-500 text-white px-12 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Start
          </button>
        )}

        {!isDone && hasStarted && (
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">{emojis[emojiIndex]}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progress}%`, transition: 'width 1s linear' }} // Fixed here
              ></div>
            </div>
            <p className="text-gray-700">Progress: {progress}%</p>
          </div>
        )}

        {isDone && (
          <div className="flex flex-col items-center">
            <div className="text-6xl text-green-500 mb-4">✔</div>
            <p className="text-gray-700 text-lg">Done!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;