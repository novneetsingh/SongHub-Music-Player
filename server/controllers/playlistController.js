const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

// Controller function to create a new playlist
exports.createPlaylist = async (req, res) => {
  const { name, thumbnail, songs } = req.body;

  // Check if all required fields are provided
  if (!name || !thumbnail || !songs) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Check if playlist already exists for the given owner
    const existingPlaylist = await Playlist.findOne({
      name,
      owner: req.user._id,
    });

    if (existingPlaylist) {
      return res.status(400).json({
        success: false,
        message: "Playlist already exists",
      });
    }

    // Create the playlist in the database
    const playlistData = await Playlist.create({
      name,
      thumbnail,
      songs,
      owner: req.user._id,
    });

    return res.status(200).json({
      success: true,
      data: playlistData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating playlist",
    });
  }
};

// Controller function to get all playlists owned by the authenticated user
exports.getMyPlaylists = async (req, res) => {
  // Extract the _id of the authenticated user from req.user
  const artistId = req.user._id;

  try {
    // Attempt to find playlists where the owner field matches the extracted _id
    const playlists = await Playlist.find({ owner: artistId });

    // If successful, return the playlists data with HTTP status 200
    return res.status(200).json({
      success: true,
      data: playlists,
    });
  } catch (error) {
    // If an error occurs during the process, return an error message with HTTP status 500
    return res.status(500).json({
      success: false,
      message: "Error retrieving playlists",
    });
  }
};

// Controller function to get a playlist by its ID
exports.getPlaylistBypPlaylistId = async (req, res) => {
  const playlistId = req.params.playlistId;
  try {
    // Find the playlist by ID and populate the 'songs' field
    const playlist = await Playlist.findById(playlistId).populate({
      path: "songs",
      populate: {
        path: "artist", // Populate 'artist' field within each song
      },
    });
    // Check if the playlist exists
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist does not exist",
      });
    }
    // Check if the user is authorized to access the playlist
    if (!playlist.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    return res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving playlist",
    });
  }
};

// Controller function to add a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);

    // Check if the playlist exists
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Check if the user is authorized to add a song to the playlist
    if (!playlist.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add this song",
      });
    }

    // Find the song by ID
    const song = await Song.findById(songId);

    // Check if the song exists
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Check if the song is already in the playlist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song is already in the playlist",
      });
    }

    // Add the song to the playlist
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding song to playlist",
    });
  }
};
