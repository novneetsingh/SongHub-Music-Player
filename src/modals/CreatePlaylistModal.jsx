import { useState } from "react";
import TextInput from "../components/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const CreatePlaylistModal = ({ closeModal }) => {
  // State variables for playlist name and thumbnail
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");
  const navigate = useNavigate();

  // Function to create a new playlist
  const createPlaylist = async () => {
    // Make a POST request to create the playlist
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });

    // If playlist is created successfully, navigate to the library page
    if (response.data._id) {
      navigate("/library");
    }
  };

  return (
    // Modal backdrop
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      {/* Modal content */}
      <div
        className="bg-app-black w-1/3 rounded-md p-8 shadow-2xl shadow-slate-700"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Modal title */}
        <div className="text-white mb-5 font-bold text-2xl">Create Playlist</div>
        
        {/* Form fields for playlist name and thumbnail */}
        <div className="space-y-4 flex flex-col justify-center items-center text-white">
          {/* Playlist name input field */}
          <TextInput
            label="Name"
            labelClassName={"text-white"}
            placeholder="Playlist Name"
            value={playlistName}
            setValue={setPlaylistName}
          />
          
          {/* Playlist thumbnail input field */}
          <TextInput
            label="Thumbnail"
            labelClassName={"text-white"}
            placeholder="Thumbnail"
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          
          {/* Button to create the playlist */}
          <div
            className="bg-green-500 w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
