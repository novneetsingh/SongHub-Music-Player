import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import CloudinaryUpload from "../components/CloudinaryUpload";
import LoggedInContainer from "../container/LoggedInContainer";
import toast from "react-hot-toast";

const UploadSong = () => {
  // State variables for form inputs and uploaded song file name
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  // Function to handle form submission
  const submitHandler = async () => {
    // Prepare data for POST request
    const data = { name, thumbnail, track: playlistUrl };
    // Make authenticated POST request to create a new song
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      // Alert user if song creation fails
      toast.error("Error uploading song");
      return;
    } else {
      toast.success("Song uploaded successfully");
      // Navigate to my music page
      navigate("/mymusic");
    }
  };

  return (
    <LoggedInContainer>
      <div>
        {/* Form for uploading music */}
        <div className="text-3xl font-semibold mb-10 text-white">
          Upload Your Music
        </div>
        <div className="w-2/3 flex space-x-3">
          {/* Input fields for name and thumbnail */}
          <div className="w-1/2 text-white">
            <TextInput
              label="Name"
              labelClassName={"text-white"}
              placeholder="Name"
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-1/2 text-white">
            <TextInput
              label="Thumbnail"
              labelClassName={"text-white"}
              placeholder="Thumbnail"
              value={thumbnail}
              setValue={setThumbnail}
            />
          </div>
        </div>
        <div>
          {/* Display uploaded song file name or cloudinary upload component */}
          {uploadedSongFileName ? (
            <div className="bg-white rounded-full p-3 w-[19%] text-black font-semibold">
              {uploadedSongFileName.substring(0, 20)}...
            </div>
          ) : (
            <CloudinaryUpload
              setUrl={setPlaylistUrl}
              setName={setUploadedSongFileName}
            />
          )}
        </div>
        {/* Button to submit the form */}
        <div
          className="bg-green-500 w-28 flex items-center justify-center p-4 rounded-full cursor-pointer font-bold text-black mt-5"
          onClick={submitHandler}
        >
          Submit
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
