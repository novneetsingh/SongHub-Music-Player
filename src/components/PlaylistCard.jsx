import React from "react";

const PlaylistCard = ({ info, addSongToPlaylist }) => {
  return (
    // Container for the playlist card
    <div
      className="bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3"
      // When clicked, call addSongToPlaylist function with the playlist ID
      onClick={() => {
        addSongToPlaylist(info._id);
      }}
    >
      {/* Playlist thumbnail */}
      <div>
        <img
          src={info.thumbnail}
          className="w-10 h-10 rounded"
          alt="thumbnail"
        />
      </div>
      {/* Playlist name */}
      <div className="text-white font-semibold text-sm">{info.name}</div>
    </div>
  );
};

export default PlaylistCard;
