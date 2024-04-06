import React, { useEffect, useState } from "react";
import LoggedInContainer from "../container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import Card from "../components/Card";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]); // State to store user's playlists

  useEffect(() => {
    const getData = async () => {
      try {
        // Make authenticated GET request to fetch user's playlists
        const response = await makeAuthenticatedGETRequest(
          "/playlist/get/myplaylists"
        );
        // Update myPlaylists state with fetched data
        setMyPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching user's playlists:", error);
      }
    };
    getData();
  }, [myPlaylists]); // Fetch data only when myPlaylists changes

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      {/* Title for My Playlists section */}
      <div className="text-white text-3xl font-semibold">My Playlists</div>
      {/* Display user's playlists using grid layout */}
      <div className="py-5 grid gap-5 grid-cols-5">
        {/* Map over myPlaylists array to render each playlist as a Card component */}
        {myPlaylists.map((item, idx) => {
          return (
            <Card
              key={idx}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

export default Library;
