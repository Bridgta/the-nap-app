const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: String,
  creator: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  timestamps: { type: [String], index: true }
});

module.exports = mongoose.model("Comment", commentSchema);
