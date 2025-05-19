// pages/api/portfolio.js
import fs from "fs";
import { join } from "path";

export default function handler(req, res) {
  const filePath = join(process.cwd(), "data", "portfolio.json");

  switch (req.method) {
    case "GET":
      try {
        const json = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(json);
        return res.status(200).json(data);
      } catch (err) {
        console.error("Error reading portfolio.json:", err);
        return res.status(500).json({ error: "Failed to read data" });
      }

    case "POST":
      if (process.env.NODE_ENV !== "development") {
        return res
          .status(403)
          .json({ error: "Writing is only allowed in development mode" });
      }
      try {
        // Pretty-print with 2-space indentation
        fs.writeFileSync(
          filePath,
          JSON.stringify(req.body, null, 2),
          "utf-8"
        );
        return res.status(200).json({ message: "Portfolio saved" });
      } catch (err) {
        console.error("Error writing portfolio.json:", err);
        return res.status(500).json({ error: "Failed to write data" });
      }

    default:
      // Only GET and POST are supported
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .end(`Method ${req.method} Not Allowed`);
  }
}