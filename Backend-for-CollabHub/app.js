const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
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

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

module.exports = app;
