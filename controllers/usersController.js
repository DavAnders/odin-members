const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      full_name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/users/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
};

exports.loginUser = (passport) => (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: "Invalid email or password. Please try again.",
    successFlash: "Welcome back!",
  })(req, res, next);
};
