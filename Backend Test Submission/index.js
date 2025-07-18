import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { shorturlsController } from "./controllers/shorturlsController.js";
import { urlstatisticsController } from "./controllers/urlstatisticsController.js";
import { redirectController } from "./controllers/redirectController.js";
import { logMessage } from "./middleware/log.js";

const loggerMiddleware = async (req, res, next) => {
  try {
    await logMessage({
      stack: "backend",
      level: "info",
      package: "middleware",
      message: `${req.method} ${
        req.originalUrl
      } called at ${new Date().toISOString()}`,
    });
  } catch (err) {
    console.error("Logger Middleware Error:", err.message);
  }
  next();
};

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.get("/", (req, res) => res.send("API is working"));
app.post("/shorturls", shorturlsController);
app.get("/shorturls/:code", urlstatisticsController);
app.get("/:code", redirectController);
app.listen(5000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
