const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

require("./config/database").dbconnect();

const userRoutes = require("./routes/user");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

app.use("/auth", userRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

// Activate
app.listen(PORT, () => {
  console.log("Server Run at ", PORT);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Hi Bye</h1>");
});
