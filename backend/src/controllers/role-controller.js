import Role from "../models/role-model.js";
import { logAction } from "../utils/log-action.js";

export const createRole = async (req, res) => {
  const role = new Role(req.body);
  try {
    await role.save();

    // Log role creation
    logAction("CREATE", "ROLE", role._id, req.user.id, { role });

    res.status(201).send(role);
  } catch (error) {
    res.status;
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).send(roles);
  } catch (error) {
    res.status;
  }
};

export const getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).send();
    }
    res.status(200).send(role);
  } catch (error) {
    res.status;
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!role) {
      return res.status(404).send();
    }

    // Log role update
    logAction("UPDATE", "ROLE", role._id, req.user.id, { role });

    res.status(200).send(role);
  } catch (error) {
    res.status;
  }
};

export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) {
      return res.status(404).send();
    }

    // Log role deletion
    logAction("DELETE", "ROLE", role._id, req.user.id, { role });

    res.status(204).send({ message: "Role deleted successfully" });
  } catch (error) {
    res.status;
  }
};
