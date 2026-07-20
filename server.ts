import express from "express";
import path from "path";
import dotenv from "dotenv";
import { verifyCompany } from "./api/_lib/verifyCompany.js";
import { createOrAttachLead, getOpportunity, listOpportunities } from "./api/_lib/opportunities.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/verify-company", async (req, res) => {
  const result = await verifyCompany(req.body?.companyName);
  res.status(result.status).json(result.body);
});

app.post("/api/create-lead", async (req, res) => {
  const body = req.body ?? {};
  if (!body.companyName || !body.contactName || !body.contactEmail || !body.contactMobile) {
    res.status(400).json({ error: "companyName, contactName, contactEmail, and contactMobile are required." });
    return;
  }
  try {
    const result = await createOrAttachLead({
      companyName: body.companyName,
      companyLandline: body.companyLandline,
      tradeLicense: body.tradeLicense,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactMobile: body.contactMobile,
      selectedProducts: Array.isArray(body.selectedProducts) ? body.selectedProducts : [],
      emirate: body.emirate,
      businessActivity: body.businessActivity,
      businessDescription: body.businessDescription,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("create-lead failed:", error);
    res.status(500).json({ error: "Failed to create lead." });
  }
});

app.get("/api/opportunities", async (_req, res) => {
  try {
    const opportunities = await listOpportunities();
    res.status(200).json({ opportunities });
  } catch (error) {
    console.error("list opportunities failed:", error);
    res.status(500).json({ error: "Failed to load opportunities." });
  }
});

app.get("/api/opportunities/:id", async (req, res) => {
  try {
    const opportunity = await getOpportunity(req.params.id);
    if (!opportunity) {
      res.status(404).json({ error: "Opportunity not found." });
      return;
    }
    res.status(200).json(opportunity);
  } catch (error) {
    console.error("get opportunity failed:", error);
    res.status(500).json({ error: "Failed to load opportunity." });
  }
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
