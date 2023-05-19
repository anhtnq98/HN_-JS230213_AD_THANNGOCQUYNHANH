const express = require("express");
const server = express();
const bodyParser = require("body-parser");

// import các routes vào server
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// sử dụng các routes
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/posts", postRoutes)

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
