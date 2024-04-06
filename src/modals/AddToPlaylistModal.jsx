import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import PlaylistCard from "../components/PlaylistCard";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  // State variable to store the user's playlists
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Make a GET request to fetch user's playlists
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/myplaylists"
      );
      // Update the state with the fetched playlists
      setMyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    // Modal backdrop
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      {/* Modal content */}
      <div
        className="bg-app-black w-1/3 h-[60%] rounded-md p-8 shadow-2xl shadow-slate-600 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Modal title */}
        <div className="text-white mb-5 font-semibold text-3xl">
          Select Playlist
        </div>

        {/* List of user's playlists */}
        <div className="h-9/10 overflow-y-scroll">
          <div className="space-y-4 flex flex-col justify-center items-center ">
            {/* Map over each playlist and render a PlaylistCard component */}
            {myPlaylists.map((item, idx) => {
              return (
                <PlaylistCard
                  key={idx}
                  info={item}
                  addSongToPlaylist={addSongToPlaylist}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
