import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleClick = () => {
    // Navigate to the playlist page if playlistId is provided
    if (playlistId) {
      navigate(`/playlist/${playlistId}`);
    }
  };

  return (
    <div
      className="bg-black bg-opacity-30 w-full h-full p-4 rounded-lg cursor-pointer hover:shadow-2xl hover:shadow-slate-600"
      onClick={handleClick}
    >
      {/* Render image if imgUrl is provided */}
      {imgUrl && (
        <div className="pb-4 pt-2 ">
          <img
            className="w-full rounded-md h-[150px] object-cover"
            src={imgUrl}
            alt={title}
          />
        </div>
      )}
      {/* Render title */}
      <div className="text-white font-semibold py-3 capitalize">{title}</div>
      {/* Render description */}
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Card;
