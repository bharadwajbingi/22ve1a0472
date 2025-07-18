import { allUrls } from "./data.js";
import { genCode } from "./util.js";

export const shorturlsController = (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const code = shortcode || genCode();
  if (!/^[a-zA-Z0-9]{4,12}$/.test(code)) {
    return res.status(400).json({ error: "Invalid shortcode format" });
  }

  if (allUrls[code]) {
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const createdAt = Date.now();
  const expiresAt = createdAt + (validity ? validity * 60000 : 30 * 60000);

  allUrls[code] = {
    url,
    createdAt,
    expiresAt,
    clickCount: 0,
    interactions: [],
  };

  return res.status(201).json({
    message: "Short URL created",
    shortUrl: `http://localhost:${5000}/${code}`,
    urlStats: `http://localhost:${5000}/shorturls/${code}`,
    expiresAt,
  });
};
