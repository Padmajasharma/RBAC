import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { requiredPermissions } from "../middleware/permission-middleware.js";
import { getLogs, getLog } from "../controllers/log-controller.js";

const router = Router();

router.get("/", authMiddleware, requiredPermissions(["read_log"]), getLogs);
router.get("/:id", authMiddleware, requiredPermissions(["read_log"]), getLog);

export default router;
