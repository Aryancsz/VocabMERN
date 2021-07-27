const mongoose = require("mongoose");
const WordSchema = new mongoose.Schema({
  result: {
    type: Object,
  },
  word: {
    type: String,
  },
});
module.exports = Word = mongoose.model("word", WordSchema);
