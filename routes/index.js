const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const expressAsyncHandler = require("express-async-handler");

// Home page route
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const messages = await Message.find()
      .populate("author")
      .sort({ timestamp: -1 });
    res.render("index", {
      user: req.user,
      messages: messages,
      isMember: req.user ? req.user.membership_status : false,
      isAdmin: req.user ? req.user.admin : false,
    });
  })
);

module.exports = router;
