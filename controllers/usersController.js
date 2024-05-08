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

exports.joinClub = async (req, res) => {
  const { passcode } = req.body;
  const secretPasscode = process.env.CLUB_PASSWORD;
  const adminPasscode = process.env.ADMIN_PASSWORD;

  if (!req.isAuthenticated()) {
    req.flash("error_msg", "You must be logged in to join the club.");
    return res.redirect("/users/login");
  }

  try {
    if (passcode === secretPasscode) {
      await User.findByIdAndUpdate(req.user._id, { membership_status: true });
      req.flash(
        "success_msg",
        "Congratulations! You are now a member of the club."
      );
    }

    if (passcode === adminPasscode) {
      await User.findByIdAndUpdate(req.user._id, { admin: true });
      req.flash("success_msg", "You have been granted admin privileges.");
    }

    if (passcode !== secretPasscode && passcode !== adminPasscode) {
      req.flash("error_msg", "Invalid passcode. Please try again.");
      return res.redirect("/users/join");
    }

    return res.redirect("/");
  } catch (error) {
    console.error("Error updating user membership status:", error);
    req.flash("error_msg", "An error occurred while processing your request.");
    return res.redirect("/users/join");
  }
};
