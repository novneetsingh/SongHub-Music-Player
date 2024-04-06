import React, { useContext, useState } from "react";
import LoggedInContainer from "../container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { Icon } from "@iconify/react";
import SongCard from "../components/SongCard";
import { SongContext } from "../context/SongContext";

const Search = () => {
  // State for input focus, search text, and search results
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { songData, setSongData } = useContext(SongContext);

  // Function to perform song search
  const searchSong = async () => {
    try {
      // Make authenticated GET request to fetch search results
      const response = await makeAuthenticatedGETRequest(
        `/song/get/songname/${searchText}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  const handleSongClick = (clickedSong) => {
    // Update the SongContext with the clicked song's data
    setSongData(searchResults);
  };

  return (
    <LoggedInContainer curActiveScreen="search">
      <div className="w-full">
        {/* Search input */}
        <div className="w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center border border-transparent focus-within:border-blue-500">
          <Icon icon="ic:outline-search" className="text-lg" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 focus:outline-none text-white"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {/* Display search results */}
        <div className="text-white mt-5">
          Showing search results for
          <span className="font-bold text-xl"> {searchText}</span>
        </div>
        {searchResults.length > 0 ? (
          <div className="mt-2 space-y-3 h-[450px] overflow-y-scroll">
            {/* Render song cards for each search result */}
            {searchResults.map((item, idx) => {
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
        ) : (
          // If no search results found
          <div className="text-gray-400 pt-10 font-bold text-2xl">
            Nothing to show here.
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default Search;
