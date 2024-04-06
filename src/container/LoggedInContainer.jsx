import React, { useContext, useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { SongContext } from "../context/SongContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  // State for controlling the visibility of modals
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  // Accessing current song from context
  const { currentSong } = useContext(SongContext);

  // Function to add a song to a playlist
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const data = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      data
    );
    if (response.data._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  return (
    // Container for the entire logged-in content
    <div className="h-full w-full bg-app-black">
      {/* Create Playlist Modal */}
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}

      {/* Add To Playlist Modal */}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}

      {/* Main content area */}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        {/* Sidebar */}
        <Sidebar
          setCreatePlaylistModalOpen={setCreatePlaylistModalOpen}
          curActiveScreen={curActiveScreen}
        />

        {/* Main content area */}
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          {/* Navbar */}
          <Navbar />

          {/* Children components */}
          <div className="p-10">{children}</div>
        </div>
      </div>

      {/* Music player */}
      <MusicPlayer setAddToPlaylistModalOpen={setAddToPlaylistModalOpen} />
    </div>
  );
};

export default LoggedInContainer;
