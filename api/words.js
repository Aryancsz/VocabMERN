const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Words = require("../models/Words");

router.post("/:word", async (req, res) => {
  try {
    const words = new Words({
      result: req.body,
    });
    words.word = await req.params.word;
    await words.save();
    res.send("Written to MongoDb");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
