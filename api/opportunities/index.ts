import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../_lib/cors.js";
import { listOpportunities } from "../_lib/opportunities.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const opportunities = await listOpportunities();
    res.status(200).json({ opportunities });
  } catch (error) {
    console.error("list opportunities failed:", error);
    res.status(500).json({ error: "Failed to load opportunities." });
  }
}
