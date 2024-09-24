import React from "react";
import "./BubbleText.css"; // CSS for bubble hover effect

const BubbleText = ({ text }) => {
  return (
    <div className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight">
      {text.split("").map((letter, idx) => (
        <span className="bubble-letter" key={idx}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default BubbleText;
