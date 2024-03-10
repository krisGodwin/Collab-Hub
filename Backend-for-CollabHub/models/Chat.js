const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sender: String,
    receiver: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);