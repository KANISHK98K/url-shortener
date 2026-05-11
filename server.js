require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
const path = require("path");

const Url = require("./models/Url");

const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Homepage Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create Short URL
app.post("/shorten", async (req, res) => {
  try {

    const { originalUrl } = req.body;

    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });

    // ...existing code...
    if (url) {
      return res.json({
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortId}`
      });
    }

    const shortId = shortid.generate();

    url = new Url({
      originalUrl,
      shortId,
    });

    await url.save();

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`
    });
// ...existing code...

 } catch (err) {
  console.error(err);

  res.status(500).send(err.message);
}
});

// Redirect to original URL
app.get("/:shortId", async (req, res) => {
  try {

    const url = await Url.findOne({
      shortId: req.params.shortId
    });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send("URL not found");
    }

 } catch (err) {
  console.error(err);
  res.status(500).json({
    error: err.message
  });
}
});


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});