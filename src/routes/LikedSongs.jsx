import React, { useContext, useEffect, useState } from "react";
import LoggedInContainer from "../container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SongCard from "../components/SongCard";
import { SongContext } from "../context/SongContext";

const LikedSongs = () => {
  const {setSongData, likedSongs, setLikedSongs } =
    useContext(SongContext);

  useEffect(() => {
    const getData = async () => {
      try {
        // Make authenticated GET request to fetch user's liked songs
        const response = await makeAuthenticatedGETRequest(
          "/song/get/likedsongs"
        );
        setLikedSongs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSongClick = (clickedSong) => {
    // Update the SongContext with the clicked song's data
    setSongData(likedSongs);
  };

  return (
    <LoggedInContainer curActiveScreen="likedsongs">
      <div>
        {/* Heading */}
        <div className="text-3xl font-semibold mb-5 text-white">
          Liked Songs
        </div>
        {/* Song list */}
        <div className="space-y-3 mt-10 h-[450px] overflow-y-scroll">
          {likedSongs.map((item, idx) => {
            return (
              <div
                className="w-1/2"
                key={idx}
                onClick={() => handleSongClick(item)}
              >
                <SongCard info={item} />
              </div>
            );
          })}
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default LikedSongs;
