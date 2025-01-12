import { Router } from "express";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/role-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { requiredPermissions } from "../middleware/permission-middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requiredPermissions(["create_role"]),
  createRole
);
router.get("/", authMiddleware, requiredPermissions(), getRoles);
router.get("/:id", authMiddleware, requiredPermissions(), getRole);
router.put(
  "/:id",
  authMiddleware,
  requiredPermissions(["update_role"]),
  updateRole
);
router.delete(
  "/:id",
  authMiddleware,
  requiredPermissions(["delete_role"]),
  deleteRole
);

export default router;
