import { verifyToken } from "../utils/jwt.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  verifyToken(token)
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch((error) => {
      return res.status(401).json({ message: "Unauthorized" });
    });
}

export { authMiddleware };
