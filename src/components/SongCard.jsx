import React, { useContext } from "react";
import { SongContext } from "../context/SongContext";

const SongCard = ({ info }) => {
  const { setCurrentSong } = useContext(SongContext);

  return (
    <div
      className=" flex hover:bg-gray-400 hover:bg-opacity-20 p-3 rounded-md"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>
      <div className="flex w-full cursor-pointer">
        <div className="text-white flex justify-center flex-col pl-4 w-5/6">
          <div className="font-bold capitalize">{info.name}</div>
          <div className="text-xs text-gray-400 capitalize">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
