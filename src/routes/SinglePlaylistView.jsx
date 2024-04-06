import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SongCard from "../components/SongCard";
import { SongContext } from "../context/SongContext";

const SinglePlaylistView = () => {
  const [playlistDetails, setPlaylistDetails] = useState(); // State to store playlist details
  const { playlistId } = useParams(); // Extracting playlistId from URL params
  const { setSongData } = useContext(SongContext);

  useEffect(() => {
    const getData = async () => {
      try {
        // Make authenticated GET request to fetch playlist details
        const response = await makeAuthenticatedGETRequest(
          "/playlist/get/playlist/" + playlistId
        );
        // Update playlistDetails state with fetched data
        setPlaylistDetails(response.data);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };
    getData();
  }, [playlistId]); // Fetch data whenever playlistId changes

  const handleSongClick = (clickedSong) => {
    // Update the SongContext with the clicked song's data
    setSongData(playlistDetails.songs);
  };

  return (
    <LoggedInContainer curActiveScreen="library">
      {playlistDetails && (
        <div>
          {/* Playlist name */}
          <div className="text-white text-3xl font-semibold capitalize">
            {playlistDetails.name}
          </div>
          {/* Song list */}
          <div className="space-y-3 mt-10 h-[450px] overflow-y-scroll">
            {playlistDetails.songs.map((item, idx) => {
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
      )}
    </LoggedInContainer>
  );
};

export default SinglePlaylistView;
