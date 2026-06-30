import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");

app.use(express.static(distDir, {
  maxAge: "1d",
  extensions: ["html"]
}));

app.use((_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`DianShang Mats website running on port ${port}`);
});
