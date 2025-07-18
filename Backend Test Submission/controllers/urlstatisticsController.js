import { allUrls } from "./data.js";

export const urlstatisticsController = (req, res) => {
  const code = req.params.code;
  const record = allUrls[code];

  if (!record) return res.status(404).json({ error: "Short URL not found" });

  const now = Date.now();
  if (now > record.expiresAt) {
    return res.status(410).json({ error: "Short URL expired" });
  }

  const interaction = {
    timestamp: now,
    referer: req.headers.referer || "unknown",
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    userAgent: req.headers["user-agent"] || "unknown",
  };

  record.clickCount += 1;
  record.interactions.push(interaction);

  return res.status(200).json({
    shortUrl: `http://localhost:${5000}/${code}`,
    originalUrl: record.url,
    expiresAt: record.expiresAt,
    clickCount: record.clickCount,
    interactions: record.interactions,
  });
};
