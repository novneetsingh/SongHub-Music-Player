import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { useCookies } from "react-cookie";
import Home from "./routes/Home";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import Search from "./routes/Search";
import Library from "./routes/Library";
import SinglePlaylistView from "./routes/SinglePlaylistView";
import LikedSongs from "./routes/LikedSongs";

const renderRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mymusic" element={<MyMusic />} />
        <Route path="/uploadsong" element={<UploadSong />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="/playlist/:playlistId" element={<SinglePlaylistView />} />
        <Route path="/likedsongs" element={<LikedSongs />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  }
};

const App = () => {
  const [cookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen flex justify-center items-center font-poppins overflow-auto bg-slate-100">
      {renderRoutes(cookie.token)}
    </div>
  );
};

export default App;
