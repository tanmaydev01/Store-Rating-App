const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  signupUser,
  getUsers,
  loginUser
} = require("../controller/userController");

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/", getUsers);

router.get("/profile", authMiddleware, (req, res) => {

  res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });

});

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("Admin"),
  (req, res) => {

    res.status(200).json({
      message: "Welcome Admin"
    });

  }
);

module.exports = router;