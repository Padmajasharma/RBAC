import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { logAction } from "../utils/log-action.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // check if password is at least 8 characters, contains a number, and a special character and capital letter
    if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, contain a number, a special character, and a capital letter",
      });
    }

    // Create password hash
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: passwordHash });

    // Log user creation
    logAction("CREATE", "USER", user._id, user._id, { user });

    const token = generateToken(user);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is valid by comparing the hash with the input password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -__v")
      .populate("roles")
      .populate("permissions");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
