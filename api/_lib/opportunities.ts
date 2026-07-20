import { kv } from "@vercel/kv";

export interface OpportunityLead {
  refId: string;
  businessType: string;
  status: string;
  price: string;
  advisor: string;
  createdDate: string;
}

export interface Opportunity {
  id: string;
  company: string;
  tradeLicense: string;
  createdDate: string;
  industry: string;
  employees: number;
  coordinator: string;
  licenseExpiry: string;
  hqAddress: string;
  landline: string;
  emirate: string;
  businessActivity: string;
  businessDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactPerson: string;
  status: string;
  source: string;
  leads: OpportunityLead[];
  documents: unknown[];
}

const INDEX_KEY = "imcrm:opportunity_ids";
const opportunityKey = (id: string) => `imcrm:opportunity:${id}`;

function generateOpportunityId(): string {
  const num = Math.floor(100000 + Math.random() * 899999);
  return `OP-${num}`;
}

function generateLeadRefId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `BUS-${suffix}`;
}

export async function listOpportunities(): Promise<Opportunity[]> {
  const ids = (await kv.get<string[]>(INDEX_KEY)) ?? [];
  if (ids.length === 0) return [];
  const opportunities = await Promise.all(ids.map((id) => kv.get<Opportunity>(opportunityKey(id))));
  return opportunities
    .filter((o): o is Opportunity => o !== null)
    .sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
}

export async function getOpportunity(id: string): Promise<Opportunity | null> {
  return (await kv.get<Opportunity>(opportunityKey(id))) ?? null;
}

async function findMatchingOpportunity(companyName: string, tradeLicense: string): Promise<Opportunity | null> {
  const opportunities = await listOpportunities();
  const normalizedName = companyName.trim().toLowerCase();
  const normalizedLicense = tradeLicense.trim().toLowerCase();

  return (
    opportunities.find((o) => {
      const matchesLicense = normalizedLicense && o.tradeLicense?.trim().toLowerCase() === normalizedLicense;
      const matchesName = normalizedName && o.company?.trim().toLowerCase() === normalizedName;
      return matchesLicense || matchesName;
    }) ?? null
  );
}

export interface CreateLeadInput {
  companyName: string;
  companyLandline?: string;
  tradeLicense?: string;
  contactName: string;
  contactEmail: string;
  contactMobile: string;
  selectedProducts: string[];
  emirate?: string;
  businessActivity?: string;
  businessDescription?: string;
}

export async function createOrAttachLead(input: CreateLeadInput): Promise<{ opportunityId: string; leadRefIds: string[] }> {
  const today = new Date().toISOString().slice(0, 10);
  const products = input.selectedProducts.length > 0 ? input.selectedProducts : ["General Enquiry"];

  const newLeads: OpportunityLead[] = products.map((businessType) => ({
    refId: generateLeadRefId(),
    businessType,
    status: "new",
    price: "-- Pending Quote --",
    advisor: "Unassigned",
    createdDate: today,
  }));

  let opportunity = await findMatchingOpportunity(input.companyName, input.tradeLicense ?? "");

  if (opportunity) {
    opportunity.leads.push(...newLeads);
  } else {
    opportunity = {
      id: generateOpportunityId(),
      company: input.companyName || input.contactName,
      tradeLicense: input.tradeLicense ?? "",
      createdDate: today,
      industry: "",
      employees: 0,
      coordinator: "Unassigned",
      licenseExpiry: "",
      hqAddress: "",
      landline: input.companyLandline ?? "",
      emirate: input.emirate ?? "",
      businessActivity: input.businessActivity ?? "",
      businessDescription: input.businessDescription ?? "",
      contactEmail: input.contactEmail,
      contactPhone: input.contactMobile,
      contactPerson: input.contactName,
      status: "new",
      source: "Journey Portal",
      leads: newLeads,
      documents: [],
    };

    const ids = (await kv.get<string[]>(INDEX_KEY)) ?? [];
    ids.push(opportunity.id);
    await kv.set(INDEX_KEY, ids);
  }

  await kv.set(opportunityKey(opportunity.id), opportunity);

  return { opportunityId: opportunity.id, leadRefIds: newLeads.map((l) => l.refId) };
}
