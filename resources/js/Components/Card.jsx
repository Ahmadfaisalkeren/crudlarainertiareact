import React from "react";

const Card = ({ title, content }) => {
  return (
    <div className="bg-gray-300 rounded-lg shadow-md p-4 max-w-sm mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Card;
