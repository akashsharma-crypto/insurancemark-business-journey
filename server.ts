import express from "express";
import path from "path";
import dotenv from "dotenv";
import { verifyCompany } from "./api/_lib/verifyCompany.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/verify-company", async (req, res) => {
  const result = await verifyCompany(req.body?.companyName);
  res.status(result.status).json(result.body);
});


// Configure Vite middleware in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
