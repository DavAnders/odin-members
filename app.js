const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const flash = require("connect-flash");
require("./config/passport")(passport);
require("dotenv").config();

// Basic configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // Passport uses 'error'
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Define routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.get("/", (req, res) => {
  res.render("index");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
