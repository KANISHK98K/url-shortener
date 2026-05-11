require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
const path = require("path");
const Url = require("./models/Url");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // ✅ serve only the public folder

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message); // ✅ logs the real reason
    process.exit(1); // stop server if DB fails
  });
// Homepage Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // ✅ updated path
});

// Create Short URL
app.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // ✅ Basic URL validation
    if (!originalUrl || !originalUrl.startsWith("http")) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });

    if (url) {
      return res.json({
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortId}`,
      });
    }

    const shortId = shortid.generate();
    url = new Url({ originalUrl, shortId });
    await url.save();

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect to original URL
app.get("/:shortId", async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});