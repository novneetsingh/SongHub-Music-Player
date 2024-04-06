import React, { useContext, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import { SongContext } from "../context/SongContext";
import { useCookies } from "react-cookie";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import toast from "react-hot-toast";

const MusicPlayer = ({ setAddToPlaylistModalOpen }) => {
  const [cookies, setCookie] = useCookies(["token"]);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    songData,
    likedSongs,
    setLikedSongs,
  } = useContext(SongContext);

  // Ref to track the initial render
  const firstUpdate = useRef(true);

  useEffect(() => {
    // Skip the first update to avoid unnecessary effect execution
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // Ensure currentSong exists before changing the song
    if (currentSong) {
      changeSong(currentSong.track);
    }
  }, [currentSong && currentSong.track]);

  // Function to play the sound
  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  // Function to change the song
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    const sound = new Howl({
      src: [songSrc],
      html5: true,
      onend: playNextSong,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  // Function to pause the sound
  const pauseSound = () => {
    if (soundPlayed) {
      soundPlayed.pause();
    }
  };

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  // Function to play the next song
  const playNextSong = () => {
    const currentIndex = songData.findIndex(
      (song) => song._id === currentSong._id
    );
    const nextIndex = (currentIndex + 1) % songData.length;
    setCurrentSong(songData[nextIndex]);
  };

  // Function to play the previous song
  const playPrevSong = () => {
    const currentIndex = songData.findIndex(
      (song) => song._id === currentSong._id
    );
    const prevIndex = (currentIndex - 1 + songData.length) % songData.length;
    setCurrentSong(songData[prevIndex]);
  };

  // If token is not present, pause the sound
  if (!cookies.token) {
    pauseSound();
    setIsPaused(true);
  }

  // Function to add or remove the current song from the liked song list
  const addOrRemoveSongFromLikedSongs = async () => {
    if (likedSongs.some((song) => song._id === currentSong._id)) {
      // Song is already liked, remove it
      const updatedLikedSongs = likedSongs.filter(
        (song) => song._id !== currentSong._id
      );
      setLikedSongs(updatedLikedSongs); // Update likedSongs state
      // Make request to update liked songs in the database
      const response = await makeAuthenticatedPOSTRequest(
        "/song/remove-from-likedsong",
        { songId: currentSong._id }
      );
      if (response.err) {
        toast.error("Could not remove song from liked songs");
      }
    } else {
      // Song is not liked, add it
      const updatedLikedSongs = [...likedSongs, currentSong];
      setLikedSongs(updatedLikedSongs); // Update likedSongs state
      // Make request to add the song to liked songs in the database
      const response = await makeAuthenticatedPOSTRequest(
        "/song/add-to-likedsong",
        { songId: currentSong._id }
      );
      if (response.err) {
        toast.error("Could not add song to liked songs");
      }
    }
  };

  return (
    <div>
      {currentSong && cookies.token && (
        <div className="w-full bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center ">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbail"
              className="h-14 w-14 rounded-lg"
            />
            <div className="pl-4 w-full">
              <div className="font-semibold capitalize">{currentSong.name}</div>
              <div className="text-xs text-gray-500 capitalize">
                {currentSong.artist.firstName} {currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={playPrevSong}
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={playNextSong}
              />
              <Icon
                icon="ic:twotone-repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            <Icon
              icon={
                likedSongs.some((song) => song._id === currentSong._id)
                  ? "twemoji:red-heart"
                  : "ph:heart-bold"
              }
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={addOrRemoveSongFromLikedSongs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
