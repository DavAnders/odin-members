// Middleware to check if the user is logged in
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Redirect if not authenticated
  res.redirect("/users/login");
};

// Middleware to check if the user is an admin
exports.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  // Redirect or send an error if not an admin
  res
    .status(403)
    .send("Access Denied: You do not have the correct permissions.");
};

// Middleware to check if the user is a member
exports.ensureMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership_status) {
    return next();
  }
  // Redirect or send an error if not a member
  res.status(403).send("Access Denied: You must be a member.");
};
