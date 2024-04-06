import React, { createContext, useState } from "react";

export const SongContext = createContext();

export default function SongContextProvider({ children }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(); 
  const [soundPlayed, setSoundPlayed] = useState(); 
  const [isPaused, setIsPaused] = useState(false); 
  const [songData, setSongData] = useState([]);

  const value = {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    songData,
    setSongData,
    likedSongs,
    setLikedSongs,
  };

  return (
    <SongContext.Provider value={value}>
      {children}
    </SongContext.Provider>
  );
}
