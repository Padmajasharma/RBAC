import app from "./app.js";
import { PORT } from "./env.js";
import { connectDB } from "./db.js";

(async function main() {
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
})();

export default app;
