export enum InsuranceProduct {
  // Landing Page Options (The 8 main ones)
  BusinessInsurance = "Business Insurance",
  WorkmenCompensation = "Workmen Compensation Insurance",
  Property = "Property Insurance",
  PublicLiability = "Public Liability Insurance",
  Sme = "SME Insurance",
  ContractorAllRisk = "Contractor's All Risk Insurance",
  MedicalMalpractice = "Medical Malpractice Insurance",
  ProfessionalIndemnity = "Professional Indemnity Insurance",

  // Multi-Select Only Options (The 25 options)
  SmePackage = "SME Package Insurance",
  HolidayHomes = "Holiday Homes Insurance",
  FireAndAllied = "Fire & Allied Perils",
  PropertyAllRisk = "Property All Risk",
  PropertyAllRiskBI = "Property All Risk + Business Interruption",
  BusinessInterruption = "Business Interruption Insurance",
  Marine = "Marine Insurance",
  Yacht = "Yacht Insurance",
  PublicLiabilitySelect = "Public Liability",
  ProductLiabilitySelect = "Product Liability",
  ProfessionalIndemnitySelect = "Professional Indemnity",
  MedicalMalpracticeSelect = "Medical Malpractice",
  DirectorsOfficersSelect = "Directors & Officers Liability",
  CommercialGeneralLiability = "Commercial General Liability",
  CyberRisk = "Cyber Risk Insurance",
  CommercialCrime = "Commercial Crime Insurance",
  ContractorAllRiskSelect = "Contractor's All Risk",
  ErectionAllRiskSelect = "Erection All Risk",
  MachineryBreakdownSelect = "Machinery Breakdown",
  ContractorsPlantSelect = "Contractors Plant & Machinery",
  WorkmenCompensationSelect = "Workmen Compensation",
  EventInsurance = "Event Insurance",
  GroupTravelSelect = "Group Travel",
  PoliticalViolenceSelect = "Political Violence",
  DroneInsurance = "Drone Insurance",

  // Group 1: Protect My Business Assets
  PoliticalViolence = "Political Violence Insurance",
  // Group 2: Cover My Employees
  GroupHealth = "Group Health Insurance",
  GroupLife = "Group Life Insurance",
  GroupTravel = "Group Travel Insurance",
  // Group 3: Protect Against Lawsuits
  DirectorsOfficers = "Directors & Officers Liability Insurance",
  ProductLiability = "Product Liability Insurance",
  // Group 4: Protect My Revenue & Data
  TradeCredit = "Trade Credit Insurance",
  CyberSecurity = "Cyber Security Insurance",
  FidelityGuarantee = "Fidelity Guarantee Insurance",
  // Group 5: Cover My Projects & Construction
  ErectionAllRisk = "Erection All Risk Insurance",
  ContractorsPlant = "Contractors Plant & Machinery Insurance",
  // Group 6: Insure Vehicles & Shipments
  MarineCargo = "Marine Cargo Insurance",
  YachtBoat = "Yacht, Boat & Jetski Insurance",
  MotorFleet = "Motor Fleet Insurance",
  // Group 7: Specialized Covers
  JewelersBlock = "Jewelers Block Insurance",
  KidnapRansom = "Kidnap & Ransom Insurance",
  DefenseBasedAct = "Defense Based Act (DBA) Insurance",
  ExtendedWarranties = "Extended Warranties Insurance",
  Livestock = "Livestock Insurance",
  MoneyInsurance = "Money Insurance",
  MachineryBreakdown = "Machinery Breakdown Insurance",
  BankersBlanket = "Bankers Blanket Bond Insurance",
}

export interface ProductDetails {
  id: InsuranceProduct;
  title: string;
  shortDescription: string;
  tooltip: string;
  heroTagline: string;
  longDescription: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  iconName: string; // Used to reference Lucide icons dynamically
}

export interface VerifiedCompany {
  companyName: string;
  companyNameArabic?: string;
  tradeLicenseNumber: string;
  licenseType: string; // e.g., LLC, Sole Establishment
  landline: string;
  address: string;
  issueDate: string;
  expiryDate: string;
  activities: string[];
  authority: string; // e.g., DET (Dubai Economy and Tourism), DMCC, DDA
  isRealMatch: boolean;
}

export interface LeadFormState {
  companyName: string;
  companyLandline: string;
  tradeLicense: string;
  contactName: string;
  contactEmail: string;
  contactMobile: string;
  selectedProducts: InsuranceProduct[];
  emirate?: string;
  businessDescription?: string;
  businessActivity?: string;
  verifiedCompany?: VerifiedCompany;
}

