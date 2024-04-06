import React, { useEffect, useContext, useState } from "react";
import SongCard from "../components/SongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../container/LoggedInContainer";
import { SongContext } from "../context/SongContext";

const MyMusic = () => {
  // Accessing songData and setSongData from SongContext
  const { setSongData } = useContext(SongContext);
  const [mySongs, setMySongs] = useState([]);

  useEffect(() => {
    // Function to fetch user's songs from the server
    const getData = async () => {
      try {
        // Make authenticated GET request to fetch user's songs
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        // Update the mySongs state with fetched songs
        setMySongs(response.data);
      } catch (error) {
        console.error("Error fetching user's songs:", error);
      }
    };
    getData();
  }, []); // Run only once on component mount

  const handleSongClick = (clickedSong) => {
    // Update the SongContext with the clicked song's data
    setSongData(mySongs);
  };

  return (
    <LoggedInContainer curActiveScreen="mymusic">
      <div>
        {/* Heading */}
        <div className="text-3xl font-semibold mb-5 text-white">My Songs</div>
        {/* Song list */}
        <div className="space-y-3 mt-10 h-[450px] overflow-y-scroll">
          {mySongs.map((item, idx) => {
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

export default MyMusic;
