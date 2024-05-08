const Message = require("../models/Message");

exports.postMessage = async (req, res) => {
  const { title, text } = req.body;
  try {
    const message = new Message({
      title,
      text,
      author: req.user._id,
    });
    await message.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error posting message");
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting message");
  }
};

exports.newMessageForm = (req, res) => {
  res.render("create-message");
};
