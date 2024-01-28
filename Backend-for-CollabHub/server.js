require("dotenv").config();
const app = require("./app.js");
const http = require("http");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT);
