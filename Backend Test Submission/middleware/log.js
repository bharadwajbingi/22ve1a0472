import axios from "axios";

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFyYWR3YWpiaW5naTU1NUBnbWFpbC5jb20iLCJleHAiOjE3NTI4MjcyNTEsImlhdCI6MTc1MjgyNjM1MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImRhMGZiMDNmLTEzOGMtNDBiZC04MmE1LTI0NzQ4YjhlNDljMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJoYXJhZHdhaiBiaW5naSIsInN1YiI6IjU2ZDNiZTc0LTdmY2EtNGFkZi04MTQxLTc0NDdkMzU0YTY4YSJ9LCJlbWFpbCI6ImJoYXJhZHdhamJpbmdpNTU1QGdtYWlsLmNvbSIsIm5hbWUiOiJiaGFyYWR3YWogYmluZ2kiLCJyb2xsTm8iOiIyMnZlMWEwNDcyIiwiYWNjZXNzQ29kZSI6Ik5OWkRHcSIsImNsaWVudElEIjoiNTZkM2JlNzQtN2ZjYS00YWRmLTgxNDEtNzQ0N2QzNTRhNjhhIiwiY2xpZW50U2VjcmV0IjoicEdod0hIa3RCQmd6YkNiZCJ9.LQ_fN_DQ34y_UY2xd6wqcdTujzBUPsnEL6cxSQB-RxY";

const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
const allowedPackages = {
  backend: [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
    "auth",
    "config",
    "middleware",
    "utils",
  ],
};

export const logMessage = async ({ stack, level, packageName, message }) => {
  try {
    if (!allowedStacks.includes(stack)) throw new Error("Invalid stack");
    if (!allowedLevels.includes(level)) throw new Error("Invalid level");
    if (!allowedPackages[stack].includes(packageName)) {
      throw new Error(`Invalid package for stack "${stack}"`);
    }

    const body = {
      stack,
      level,
      package: packageName,
      message,
    };

    const headers = {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(LOG_API_URL, body, { headers });
    return response.data;
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
};
