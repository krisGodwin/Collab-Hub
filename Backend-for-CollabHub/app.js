const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const path = require('path');
const mongoose = require("mongoose");




const ContentCreatorRoute = require("./routes/ContentCreatorRoute.js");
const HiringRoute = require("./routes/HiringRoute.js");

// const cors = require('cors')

const cookieParser = require("cookie-parser")

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));

const corsConfig = {
  credentials: true,
  origin: true,
};

// app.use(cors(corsConfig));

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(bodyParser.json({limit: '50mb'}));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//       return res.status(200).json({});
//     }
//     next();
// });

app.use(cookieParser());

const Chat = require('./models/Chat.js')

app.get('/getmsgs', async (req, res) => {
  const {sender, receiver} = req.query;
  const messages = await Chat.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender }
    ]
  });
  res.json(messages);
});

app.post('/setchats', async (req, res) => {
  const newMsg = await new Chat({
    ...req.body,
  });
  await newMsg.save();
  const {sender, receiver} = req.body;
  const messages = await Chat.find({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender }
    ]
  });
  res.json(messages);
});

app.use("/content",ContentCreatorRoute);
app.use("/hiring",HiringRoute);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  const server = app.listen(8000, () => {
    console.log('server is running on', 8000);
    //   User.insertMany(users);
    // Post.insertMany(posts);
  })

  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log('connecting to socket')
    socket.on("message", ({ message, senderId, senderName, club }) => {
      // console.log('messaging', {message, senderId, senderName})
      const newMsg = new Chat({
        message,
        senderId,
        senderName,
        club,
      });
      newMsg.save();
      io.emit("message", { message, senderId, senderName });
    });
  
    // socket.on("add-user", (userId) => {
    //   onlineUsers.set(userId, socket.id);
    // });
  
    // socket.on("personal-message", (message) => {
    //   const { sender_id, receiver_id } = message;
  
    //   const senderSocketId = onlineUsers.get(sender_id);
    //   if (senderSocketId) {
    //     io.to(senderSocketId).emit("personal-message", message);
    //   }
  
    //   const recipientSocketId = onlineUsers.get(receiver_id);
    //   if (recipientSocketId) {
    //     io.to(recipientSocketId).emit("personal-message", message);
    //   }
    // });
  
    // socket.on("disconnect", () => {
    //   onlineUsers.forEach((socketId, userId) => {
    //     if (socketId === socket.id) {
    //       onlineUsers.delete(userId);
    //     }
    //   });
    // });
  
  
    socket.on("msgsolo", (messageData) => {
      console.log('ms', messageData)
      const { sender, receiver, message } = messageData;
      const messageToSend = {
        sender,
        receiver,
        message,
      };
      io.emit("msgsolo", messageToSend);
    });
  });
module.exports = app;
