const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/usersController");
const expressAsyncHandler = require("express-async-handler");

// Register Handle
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", expressAsyncHandler(usersController.registerUser));

// Login Handle
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", expressAsyncHandler(usersController.loginUser(passport)));

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/join", (req, res) => {
  res.render("join");
});

router.post("/join", expressAsyncHandler(usersController.joinClub));

module.exports = router;
