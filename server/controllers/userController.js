import {
  createUser,
  findUserByUsername,
  comparePassword,
} from "../models/user.js";

// Controller to register a user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await createUser(username, password);
    req.session.userId = newUser.id;

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error creating user: " + err.message });
  }
};

// Controller to log in a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.userId = user.id;
    res.status(200).json({ message: "Login successful", user: user });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in from userController: " + err.message,
    });
  }
};

// Controller to log out a user
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export { registerUser, loginUser, logoutUser };
