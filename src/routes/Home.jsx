import React from "react";
import PlaylistView from "../components/PlaylistView";
import focusCardsData from "../assets/focusCardsData";
import PlaylistsCardData from "../assets/PlaylistsCardData";
import LoggedInContainer from "../container/LoggedInContainer";
import SongIndiaCardData from "../assets/SongIndiaCardData";

const Home = () => {
  return (
    <LoggedInContainer curActiveScreen="home">
      <PlaylistView titleText="Focus" cardsData={focusCardsData} />
      <PlaylistView
        titleText="SongHub Playlists"
        cardsData={PlaylistsCardData}
      />
      <PlaylistView titleText="Sound of India" cardsData={SongIndiaCardData} />
    </LoggedInContainer>
  );
};

export default Home;
