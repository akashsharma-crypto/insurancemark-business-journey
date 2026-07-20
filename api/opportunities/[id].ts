import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../_lib/cors.js";
import { getOpportunity } from "../_lib/opportunities.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;
  if (typeof id !== "string") {
    res.status(400).json({ error: "Opportunity id is required." });
    return;
  }

  try {
    const opportunity = await getOpportunity(id);
    if (!opportunity) {
      res.status(404).json({ error: "Opportunity not found." });
      return;
    }
    res.status(200).json(opportunity);
  } catch (error) {
    console.error("get opportunity failed:", error);
    res.status(500).json({ error: "Failed to load opportunity." });
  }
}
