import { Router } from "express";
import {
  createPermission,
  deletePermission,
  getPermission,
  getPermissions,
  updatePermission,
} from "../controllers/permission-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { requiredPermissions } from "../middleware/permission-middleware.js";

const router = Router();
router.post(
  "/",
  authMiddleware,
  requiredPermissions(["create_permission"]),
  createPermission
);
router.get(
  "/",
  authMiddleware,
  requiredPermissions(["read_permission"]),
  getPermissions
);
router.get(
  "/:id",
  authMiddleware,
  requiredPermissions(["read_permission"]),
  getPermission
);
router.put(
  "/:id",
  authMiddleware,
  requiredPermissions(["update_permission"]),
  updatePermission
);
router.delete(
  "/:id",
  authMiddleware,
  requiredPermissions(["delete_permission"]),
  deletePermission
);

export default router;
