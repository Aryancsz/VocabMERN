const express = require("express");
const router = express.Router();
const Words = require("../models/Words");

router.get("/", async (req, res) => {
  try {
    const dbWords = await Words.find();
    res.json(dbWords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
