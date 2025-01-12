import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth-router.js";
import articleRoutes from "./routes/article-router.js";
import roleRoutes from "./routes/role-router.js";
import permissionRoutes from "./routes/permission-router.js";
import userRoutes from "./routes/user-router.js";
import logRoutes from "./routes/log-router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

export default app;
