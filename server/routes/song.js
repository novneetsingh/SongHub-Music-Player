const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  createSong,
  getAllSongs,
  getSongBySongName,
  addSongToLikedSongs,
  removeSongFromLikedSongs,
  getLikedSongs,
} = require("../controllers/songController");

// Route to create a new song
router.post("/create", auth, createSong);

// Route to get all songs of the authenticated user
router.get("/get/mysongs", auth, getAllSongs);

// Route to get songs by their name
router.get("/get/songname/:songName", auth, getSongBySongName);

// Route to add a song to liked songs
router.post("/add-to-likedsong", auth, addSongToLikedSongs);

// Route to remove a song from liked songs
router.post("/remove-from-likedsong", auth, removeSongFromLikedSongs);

// Route to get all liked songs of the authenticated user
router.get("/get/likedsongs", auth, getLikedSongs);

module.exports = router;
