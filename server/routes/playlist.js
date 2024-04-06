const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createPlaylist,
  getMyPlaylists,
  getPlaylistBypPlaylistId,
  addSongToPlaylist,
} = require("../controllers/playlistController");

// Route to create a new playlist
router.post("/create", auth, createPlaylist);

// Route to get all playlists of the authenticated user
router.get("/get/myplaylists", auth, getMyPlaylists);

// Route to get a playlist by its ID
router.get("/get/playlist/:playlistId", auth, getPlaylistBypPlaylistId);

// Route to add a song to a playlist
router.post("/add/song", auth, addSongToPlaylist);

module.exports = router;
