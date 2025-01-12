import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  getMyArticles,
  getPublishedArticles,
  updateArticle,
  publishArticle,
} from "../controllers/article-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { requiredPermissions } from "../middleware/permission-middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requiredPermissions(["create_article"]),
  createArticle
);
router.get("/published", getPublishedArticles);
router.get("/my", authMiddleware, getMyArticles);
router.get("/:id", getArticle);
router.get("/", authMiddleware, requiredPermissions(["read_article"]), getArticles);
router.put(
  "/:id",
  authMiddleware,
  requiredPermissions(["update_article"]),
  updateArticle
);
router.delete(
  "/:id",
  authMiddleware,
  requiredPermissions(["delete_article"]),
  deleteArticle
);
router.put(
  "/:id/publish",
  authMiddleware,
  requiredPermissions(["publish_article"]),
  publishArticle
);

export default router;
