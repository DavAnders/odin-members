const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");
const messagesController = require("../controllers/messagesController");
const expressAsyncHandler = require("express-async-handler");

// Route to show the form to create a new message
router.get("/new", ensureAuthenticated, messagesController.newMessageForm);

// Route to handle the POST request for new message creation
router.post(
  "/new",
  ensureAuthenticated,
  expressAsyncHandler(messagesController.postMessage)
);

// Route to delete a message
router.get(
  "/delete/:id",
  ensureAuthenticated,
  ensureAdmin,
  expressAsyncHandler(messagesController.deleteMessage)
);

module.exports = router;
