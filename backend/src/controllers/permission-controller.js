import Permission from "../models/permission-model.js";
import { logAction } from "../utils/log-action.js";

export const createPermission = async (req, res) => {
  const permission = new Permission(req.body);
  try {
    await permission.save();

    // Log permission creation
    logAction("CREATE", "PERMISSION", permission._id, req.user.id, {
      permission,
    });

    res.status(201).send(permission);
  } catch (error) {
    res.status;
  }
};

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).send(permissions);
  } catch (error) {
    res.status;
  }
};

export const getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).send();
    }
    res.status(200).send(permission);
  } catch (error) {
    res.status;
  }
};

export const updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!permission) {
      return res.status(404).send();
    }

    // Log permission update
    logAction("UPDATE", "PERMISSION", permission._id, req.user.id, {
      permission,
    });

    res.status(200).send(permission);
  } catch (error) {
    res.status;
  }
};

export const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      return res.status(404).send();
    }

    // Log permission deletion
    logAction("DELETE", "PERMISSION", permission._id, req.user.id, {
      permission,
    });

    res.status(204).send({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status;
  }
};
