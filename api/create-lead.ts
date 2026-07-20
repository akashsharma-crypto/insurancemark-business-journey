import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "./_lib/cors.js";
import { createOrAttachLead } from "./_lib/opportunities.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

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
}
