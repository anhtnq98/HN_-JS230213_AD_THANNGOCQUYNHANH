const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// import các routes vào server
const userRoutes = require("./routes/user.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// sử dụng các routes
server.use("/api/v1/users", userRoutes);

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
