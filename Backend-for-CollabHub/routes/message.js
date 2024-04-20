const express = require("express");
const router = express.Router();
const PERSONAL_MESSAGE = require("../models/personal_message");
const ContentCreatorModel = require("../models/ContentCreatorModel.js");

const {UserModel,UserType} = require("../models/UserModel.js");
const Hiring = require("../models/HiringModel.js");

router.get(
  "/api/all-personal-messages/:senderId/:receiverId",
  async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
      const messages = await PERSONAL_MESSAGE.find({
        $or: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId },
        ],
      }).sort({ createdAt: 1 });

      res.json(messages);
    } catch (error) {
      console.error("Error fetching personal messages:", error);
      res.status(500).json({ error: "Failed to fetch personal messages" });
    }
  }
);



router.post("/api/save-personal-message", async (req, res) => {
  const { message, sender_name, receiver_name, sender_id, receiver_id } =
    req.body;

  try {
    const newMessage = new PERSONAL_MESSAGE({
      message: message,
      sender_name: sender_name,
      receiver_name: receiver_name,
      sender_id: sender_id,
      receiver_id: receiver_id,
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error("Error saving personal message:", error);
    res.status(500).json({ error: "Failed to save personal message" });
  }
});


router.get("/api/all-users/:id", async (req, res, next) => {
  try {
    const hiringusers = await Hiring.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "_id",
      "name"
    ]); 
    return res.json(hiringusers);
  } catch (ex) {
    next(ex);
  }
});

router.get("/api/content/:id", async (req, res, next) => {
  try {
    const contentusers = await ContentCreatorModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "_id",
      "name"
    ]); 
    return res.json(contentusers);
  } catch (ex) {
    next(ex);
  }
});

router.get("/api/user/:id", (req, res) => {
  Hiring.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      console.log(user)

      return res.json(user);
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found." });
    });
});



module.exports = router;
