const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/personal_message");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const ContentCreatorRoute = require("./routes/ContentCreatorRoute.js");
const HiringRoute = require("./routes/HiringRoute.js");

const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

app.use("/content", ContentCreatorRoute);
app.use("/hiring", HiringRoute);

app.use(require("./routes/message"));

  


const server = app.listen(8000, () => {
    console.log('server is running on', 8000);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        io.emit("message", message);
    });

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("personal-message", (message) => {
        const { sender_id, receiver_id } = message;

        const senderSocketId = onlineUsers.get(sender_id);
        if (senderSocketId) {
            io.to(senderSocketId).emit("personal-message", message);
        }

        const recipientSocketId = onlineUsers.get(receiver_id);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("personal-message", message);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers.forEach((socketId, userId) => {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
            }
        });
    });
});

module.exports = app;
