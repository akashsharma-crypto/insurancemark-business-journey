import { InsuranceProduct } from "../types";

const BASE = "/assets/lob-business";

// Maps each business InsuranceProduct to its themed Alfred illustration.
// Multiple enum members that represent the same real-world cover (e.g. the
// "*Select" variants used only inside the multi-select catalogue) share the
// same image as their primary counterpart.
export const BUSINESS_ICON_MAP: Partial<Record<InsuranceProduct, string>> = {
  [InsuranceProduct.GroupHealth]: `${BASE}/group-health.png`,

  [InsuranceProduct.Sme]: `${BASE}/sme-insurance.png`,
  [InsuranceProduct.SmePackage]: `${BASE}/sme-insurance.png`,

  [InsuranceProduct.ProfessionalIndemnity]: `${BASE}/professional-indemnity.png`,
  [InsuranceProduct.ProfessionalIndemnitySelect]: `${BASE}/professional-indemnity.png`,

  [InsuranceProduct.PublicLiability]: `${BASE}/public-liability.png`,
  [InsuranceProduct.PublicLiabilitySelect]: `${BASE}/public-liability.png`,
  [InsuranceProduct.ProductLiability]: `${BASE}/public-liability.png`,
  [InsuranceProduct.ProductLiabilitySelect]: `${BASE}/public-liability.png`,
  [InsuranceProduct.CommercialGeneralLiability]: `${BASE}/public-liability.png`,

  [InsuranceProduct.WorkmenCompensation]: `${BASE}/workmen-compensation.png`,
  [InsuranceProduct.WorkmenCompensationSelect]: `${BASE}/workmen-compensation.png`,

  [InsuranceProduct.ContractorAllRisk]: `${BASE}/contractors-all-risk.png`,
  [InsuranceProduct.ContractorAllRiskSelect]: `${BASE}/contractors-all-risk.png`,

  [InsuranceProduct.Property]: `${BASE}/property-insurance.png`,
  [InsuranceProduct.PropertyAllRisk]: `${BASE}/property-insurance.png`,
  [InsuranceProduct.PropertyAllRiskBI]: `${BASE}/property-insurance.png`,
  [InsuranceProduct.FireAndAllied]: `${BASE}/property-insurance.png`,

  [InsuranceProduct.MarineCargo]: `${BASE}/marine-cargo.png`,
  [InsuranceProduct.Marine]: `${BASE}/marine-cargo.png`,

  [InsuranceProduct.PoliticalViolence]: `${BASE}/political-violence.png`,
  [InsuranceProduct.PoliticalViolenceSelect]: `${BASE}/political-violence.png`,

  [InsuranceProduct.HolidayHomes]: `${BASE}/holiday-homes.png`,

  [InsuranceProduct.GroupLife]: `${BASE}/group-life.png`,

  [InsuranceProduct.GroupTravel]: `${BASE}/group-travel.png`,
  [InsuranceProduct.GroupTravelSelect]: `${BASE}/group-travel.png`,

  [InsuranceProduct.DirectorsOfficers]: `${BASE}/directors-officers.png`,
  [InsuranceProduct.DirectorsOfficersSelect]: `${BASE}/directors-officers.png`,

  [InsuranceProduct.MedicalMalpractice]: `${BASE}/medical-malpractice.png`,
  [InsuranceProduct.MedicalMalpracticeSelect]: `${BASE}/medical-malpractice.png`,

  [InsuranceProduct.TradeCredit]: `${BASE}/trade-credit.png`,

  [InsuranceProduct.CyberSecurity]: `${BASE}/cyber-security.png`,
  [InsuranceProduct.CyberRisk]: `${BASE}/cyber-security.png`,

  [InsuranceProduct.FidelityGuarantee]: `${BASE}/fidelity-guarantee.png`,
  [InsuranceProduct.CommercialCrime]: `${BASE}/fidelity-guarantee.png`,

  [InsuranceProduct.ErectionAllRisk]: `${BASE}/erection-all-risk.png`,
  [InsuranceProduct.ErectionAllRiskSelect]: `${BASE}/erection-all-risk.png`,

  [InsuranceProduct.ContractorsPlant]: `${BASE}/contractors-plant.png`,
  [InsuranceProduct.ContractorsPlantSelect]: `${BASE}/contractors-plant.png`,

  [InsuranceProduct.YachtBoat]: `${BASE}/yacht-boat-jetski.png`,
  [InsuranceProduct.Yacht]: `${BASE}/yacht-boat-jetski.png`,

  [InsuranceProduct.MotorFleet]: `${BASE}/motor-fleet.png`,

  [InsuranceProduct.EventInsurance]: `${BASE}/event-insurance.png`,

  [InsuranceProduct.DroneInsurance]: `${BASE}/drone-insurance.png`,

  [InsuranceProduct.JewelersBlock]: `${BASE}/jewelers-block.png`,

  [InsuranceProduct.KidnapRansom]: `${BASE}/kidnap-ransom.png`,

  [InsuranceProduct.DefenseBasedAct]: `${BASE}/defense-based-act.png`,

  [InsuranceProduct.ExtendedWarranties]: `${BASE}/extended-warranties.png`,

  [InsuranceProduct.Livestock]: `${BASE}/livestock.png`,

  [InsuranceProduct.BusinessInterruption]: `${BASE}/business-interruption.png`,

  [InsuranceProduct.MoneyInsurance]: `${BASE}/money-insurance.png`,

  [InsuranceProduct.MachineryBreakdown]: `${BASE}/machinery-breakdown.png`,
  [InsuranceProduct.MachineryBreakdownSelect]: `${BASE}/machinery-breakdown.png`,

  [InsuranceProduct.BankersBlanket]: `${BASE}/bankers-blanket-bond.png`,

  // Generic "Business" entry point tile — suited Alfred, no single dedicated cover
  [InsuranceProduct.BusinessInsurance]: `${BASE}/sme-insurance.png`,
};

const FALLBACK_ICON = `${BASE}/sme-insurance.png`;

export function getBusinessIcon(product: InsuranceProduct): string {
  return BUSINESS_ICON_MAP[product] || FALLBACK_ICON;
}
