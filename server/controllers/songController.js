const Song = require("../models/Song");
const User = require("../models/User");

// Controller function to create a new song
exports.createSong = async (req, res) => {
  try {
    // Extracting necessary data from request body
    const { name, thumbnail, track } = req.body;

    // Checking if all required fields are provided
    if (!name || !thumbnail || !track) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Retrieving artist id from authenticated user
    const artist = req.user._id;

    // Checking if the song already exists for the given artist
    const existingSong = await Song.findOne({ name, artist });

    if (existingSong) {
      return res.status(400).json({
        success: false,
        message: "Song already exists",
      });
    }

    // Creating new song in the database
    const createdSong = await Song.create({
      name,
      thumbnail,
      track,
      artist,
    });

    // Sending success response with created song data
    return res.status(200).json({
      success: true,
      message: "Song created successfully",
      data: createdSong,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create song",
    });
  }
};

// Controller function to retrieve all songs created by the authenticated user
exports.getAllSongs = async (req, res) => {
  try {
    // Retrieving all songs created by the authenticated user
    const songs = await Song.find({ artist: req.user._id }).populate(
      "artist", // Populating the artist field with firstName and lastName
      "firstName lastName"
    );

    // Sending success response with retrieved songs data
    return res.status(200).json({
      success: true,
      message: "Songs retrieved successfully",
      data: songs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve songs",
    });
  }
};

// Controller function to retrieve songs by song name (partial match)
exports.getSongBySongName = async (req, res) => {
  try {
    const { songName } = req.params;

    // Finding songs with names matching the provided songName
    const songs = await Song.find({
      name: { $regex: songName, $options: "i" }, // Using case-insensitive regex for partial matching
    }).populate("artist", "firstName lastName");

    // If no matching songs found, return error response
    if (songs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No songs found matching the provided name",
      });
    }

    // Sending success response with retrieved songs data
    return res.status(200).json({
      success: true,
      message: "Songs retrieved successfully",
      data: songs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve songs by song name",
    });
  }
};

// Function to add a song to the likedSongs array in the user model if it's not already present
exports.addSongToLikedSongs = async (req, res) => {
  try {
    const { songId } = req.body;

    const user = await User.findById(req.user._id);

    // Check if the songId is already present in the likedSongs array
    if (user.likedSongs.includes(songId)) {
      // If song is already present, return a message indicating so
      return res.status(400).json({
        success: false,
        message: "Song already exists in liked songs",
      });
    }

    // Add the song ID to the likedSongs array
    user.likedSongs.push(songId);

    // Save the updated user document
    await user.save();

    // Return success message along with updated user document
    return res.status(200).json({
      success: true,
      message: "Song added to liked songs successfully",
      data: user,
    });
  } catch (error) {
    // Return error message if any error occurs
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function to remove a song from the likedSongs array
exports.removeSongFromLikedSongs = async (req, res) => {
  try {
    const { songId } = req.body;

    const user = await User.findById(req.user._id);

    // Check if the songId is present in the likedSongs array
    if (!user.likedSongs.includes(songId)) {
      // If song is not present, return a message indicating so
      return res.status(400).json({
        success: false,
        message: "Song does not exist in liked songs",
      });
    }

    // Remove the song ID from the likedSongs array
    user.likedSongs = user.likedSongs.filter((id) => id !== songId);

    // Save the updated user document
    await user.save();

    // Return success message along with updated user document
    return res.status(200).json({
      success: true,
      message: "Song removed from liked songs successfully",
      data: user,
    });
  } catch (error) {
    // Return error message if any error occurs
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get all liked songs
exports.getLikedSongs = async (req, res) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.user._id).populate({
      path: "likedSongs",
      model: "Song",
      populate: {
        path: "artist",
        model: "User",
        select: "firstName lastName", // Selecting only the firstName and lastName fields
      },
    });

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user object with populated likedSongs array
    return res.status(200).json({
      success: true,
      message: "Liked songs retrieved successfully",
      data: user.likedSongs, // Accessing the populated likedSongs array
    });
  } catch (error) {
    // Log the error and return an error response
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve liked songs",
    });
  }
};
