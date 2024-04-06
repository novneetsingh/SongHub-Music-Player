import React from "react";
import { Icon } from "@iconify/react";
import IconText from "./IconText";
import Logo from "../assets/logo1.svg";

const Sidebar = ({ setCreatePlaylistModalOpen, curActiveScreen }) => {
  return (
    <aside className="h-full w-1/5 bg-black flex flex-col justify-between pb-10 text-white">
      {/* Logo */}
      <div>
        <div className="p-2 pl-4 flex justify-start items-center">
          <img src={Logo} alt="Logo" />
          <span className="font-semibold text-2xl">SongHub</span>
        </div>

        {/* Navigation Links */}
        <div className="py-5">
          <IconText
            iconName={"material-symbols:home"}
            displayText={"Home"}
            targetLink={"/home"}
            active={curActiveScreen === "home"}
          />
          <IconText
            iconName={"material-symbols:search-rounded"}
            displayText={"Search"}
            targetLink={"/search"}
            active={curActiveScreen === "search"}
          />
          <IconText
            iconName={"icomoon-free:books"}
            displayText={"Library"}
            targetLink={"/library"}
            active={curActiveScreen === "library"}
          />
          <IconText
            iconName={"material-symbols:library-music-sharp"}
            displayText={"My Music"}
            targetLink={"/mymusic"}
            active={curActiveScreen === "mymusic"}
          />
        </div>

        {/* Additional Actions */}
        <div className="pt-5">
          <IconText
            iconName={"material-symbols:add-box"}
            displayText={"Create Playlist"}
            onClick={() => {
              setCreatePlaylistModalOpen(true);
            }}
          />
          <IconText
            iconName={"mdi:cards-heart"}
            displayText={"Liked Songs"}
            targetLink={"/likedsongs"}
            active={curActiveScreen === "likedsongs"}
          />
        </div>
      </div>

      {/* Language Selector */}
      <div className="px-5">
        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
          <Icon icon="carbon:earth-europe-africa" />
          <div className="ml-2 text-sm font-semibold">English</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
