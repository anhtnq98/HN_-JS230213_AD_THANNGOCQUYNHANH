const express = require("express");
const router = express.Router();
const fs = require("fs");

// Lấy về dữ liệu của toàn bộ users
router.get(`/`, (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync(`./user-post-api/users.json`));
    res.status(200).json(users);
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Lấy về dữ liệu của một user
router.get(`/:id`, (req, res) => {
  let { id } = req.params;
  let users = JSON.parse(fs.readFileSync(`./user-post-api/users.json`));
  try {
    let findUserById = users.find((e, i) => e.id === +id);
    if (findUserById) {
      res.status(200).json(findUserById);
    } else {
      res.status(404).json({
        messesge: `Không tìm thấy người dùng`,
      });
    }
  } catch (error) {}
});

// thêm user mới
router.post("/", (req, res) => {
  let { username, email } = req.body;
  if (!username || !email) {
    res.json({
      messege: "Tên đăng nhập và email đang để trống",
    });
  } else {
    let newUser = {
      id: Math.floor(Math.random() * 1000000000),
      name: null,
      username: username,
      email: email,
      address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
      phone: null,
      website: null,
      company: {
        name: null,
        catchPhrase: null,
        bs: null,
      },
    };
    try {
      let users = JSON.parse(fs.readFileSync(`./user-post-api/users.json`));
      users.push(newUser);
      fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
      res.status(201).json({
        messege: "Thêm người dùng mới thành công",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

//update email người dùng
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { email } = req.body;
  let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
  let userIndex = users.findIndex((e) => +e.id === +id);
  if (!email) {
    res.json({
      messege: "Email không được để trống",
    });
  } else if (userIndex === -1) {
    res.json({
      messege: "Không tìm thấy người dùng",
    });
  } else {
    users[userIndex].email = email;
  }
  try {
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
    res.status(200).json({
      messege: "Update email người dùng thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
  let newUser = users.filter((e) => +e.id !== +id);
  try {
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(newUser));
    res.status(200).json({
      messege: "Xóa người dùng thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
