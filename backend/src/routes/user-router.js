import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { requiredPermissions } from "../middleware/permission-middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requiredPermissions(["create_user"]),
  createUser
);
router.get("/", authMiddleware, requiredPermissions(["read_user"]), getUsers);
router.get("/:id", authMiddleware, requiredPermissions(["read_user"]), getUser);
router.put(
  "/:id",
  authMiddleware,
  requiredPermissions(["update_user"]),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  requiredPermissions(["delete_user"]),
  deleteUser
);

export default router;
