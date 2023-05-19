const express = require("express");
const router = express.Router();
const fs = require("fs");

// Lấy về dữ liệu của toàn bộ posts
router.get(`/`, (req, res) => {
  try {
    let posts = JSON.parse(fs.readFileSync(`./user-post-api/posts.json`));
    res.status(200).json(posts);
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Lấy về dữ liệu của một post
router.get(`/:id`, (req, res) => {
  let { id } = req.params;
  let posts = JSON.parse(fs.readFileSync(`./user-post-api/posts.json`));
  try {
    let findPostById = posts.find((e, i) => e.id === +id);
    if (findPostById) {
      res.status(200).json(findPostById);
    } else {
      res.status(404).json({
        messesge: `Không tìm thấy bài viết`,
      });
    }
  } catch (error) {}
});

// thêm bài viết mới
router.post("/", (req, res) => {
  let { title, body } = req.body;
  if (!title || !body) {
    res.json({
      messege: "Thông tin không được để trống",
    });
  } else {
    let newPost = {
      userId: 384806123,
      id: Math.floor(Math.random() * 1000000000),
      title,
      body,
    };
    try {
      let posts = JSON.parse(fs.readFileSync(`./user-post-api/posts.json`));
      posts.push(newPost);
      fs.writeFileSync(`./user-post-api/posts.json`, JSON.stringify(posts));
      res.status(201).json({
        messege: "Thêm bài viết mới thành công",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

//update bài viết
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;
  let posts = JSON.parse(fs.readFileSync(`./user-post-api/posts.json`));
  let postIndex = posts.findIndex((e) => +e.id === +id);
  if (!title || !body) {
    res.json({
      messege: "Thông tin không được để trống",
    });
  } else if (postIndex === -1) {
    res.status(404).json({
      messege: "Không tìm thấy bài viết",
    });
  } else {
    posts[postIndex].title = title;
    posts[postIndex].body = body;
  }
  try {
    fs.writeFileSync(`./user-post-api/posts.json`, JSON.stringify(posts));
    res.status(200).json({
      messege: "Update bài viết thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Xóa bài viết
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let posts = JSON.parse(fs.readFileSync(`./user-post-api/posts.json`));
  let newPost = posts.filter((e) => +e.id !== +id);
  try {
    fs.writeFileSync(`./user-post-api/posts.json`, JSON.stringify(newPost));
    res.status(200).json({
      messege: "Xóa bài viết thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
