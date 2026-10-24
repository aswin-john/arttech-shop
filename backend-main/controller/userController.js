const User = require("../database/model/user");
const { hashPassword, verifyPassword } = require("../service/password");
const { signToken } = require("../service/authToken");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

module.exports.register = async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = req.body.password;

    if (!name || name.length > 100 || !emailPattern.test(email)) {
      return res.status(400).json({ success: false, message: "Enter a name and a valid email address." });
    }
    if (typeof password !== "string" || password.length < 8 || password.length > 128) {
      return res.status(400).json({ success: false, message: "Password must be between 8 and 128 characters." });
    }
    if (await User.exists({ email })) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    // Never accept a role from the request body; public sign-ups are customers.
    const user = await User.create({ name, email, password: await hashPassword(password), role: "user" });
    return res.status(201).json({
      success: true,
      message: "Account created. You are signed in as a customer.",
      user: publicUser(user),
      token: signToken(user._id, user.role),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: "Could not create the account." });
  }
};

module.exports.login = async (req, res) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = req.body.password;
    if (!emailPattern.test(email) || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "Enter a valid email and password." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ success: false, message: "Email or password is incorrect." });
    }
    // Treat legacy accounts without a role as regular customers.
    const role = user.role === "admin" ? "admin" : "user";
    const isAdmin = role === "admin";
    return res.json({
      success: true,
      message: isAdmin ? "Admin sign-in successful." : "Sign-in successful.",
      user: { ...publicUser(user), role },
      token: signToken(user._id, role),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Could not sign in." });
  }
};
