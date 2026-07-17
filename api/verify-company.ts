import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyCompany } from "./_lib/verifyCompany.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { companyName } = req.body ?? {};
  const result = await verifyCompany(companyName);
  res.status(result.status).json(result.body);
}
