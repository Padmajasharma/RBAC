import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import { logAction } from "../utils/log-action.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    // Check if password is at least 8 characters, contains a number, and a special character and capital letter
    if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
        user.password
      )
    ) {
      return res.status(400).send({
        message:
          "Password must be at least 8 characters, contain a number, a special character, and a capital letter",
      });
    }

    // Create password hash
    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;

    // Create user
    await user.save();

    // Log user creation
    logAction("CREATE", "USER", user._id, req.user.id, { user });

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send;
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles");
    res.status(200).send(users);
  } catch (error) {
    res.status;
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status;
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    // Log user deletion
    logAction("DELETE", "USER", user._id, req.user.id, { user });

    res.status(200).send(user);
  } catch (error) {
    res.status;
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    // Log user update
    logAction("UPDATE", "USER", user._id, req.user.id, { user });

    res.status(200).send(user);
  } catch (error) {
    res.status;
  }
};
