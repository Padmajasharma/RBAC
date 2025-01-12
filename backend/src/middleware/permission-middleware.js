import User from "../models/user-model.js";

const requiredPermissions = (permissions = []) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
        path: "roles",
        populate: {
          path: "permissions",
        },
      }).populate("permissions");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has the permissions directly
      const hasPermissions = permissions.every((permission) =>
        user.permissions.map((p) => p.name).includes(permission)
      );

      if (hasPermissions) {
        return next();
      }

      // Check if the user has the permissions through roles
      const hasPermissionsThroughRoles = user.roles.some((role) => {
        return permissions.every((requiredPermission) =>
          role.permissions.some(
            (permission) => permission.name === requiredPermission
          )
        );
      });

      if (hasPermissionsThroughRoles) {
        return next();
      }

      return res.status(403).json({
        message: "Forbidden: You do not have the required permissions",
      });
    } catch (error) {
      next(error);
    }
  };
};

export { requiredPermissions };
