import { InsuranceProduct, ProductDetails } from "../types";

export const PRODUCT_DETAILS_MAP: Record<InsuranceProduct, ProductDetails> = {
  [InsuranceProduct.BusinessInsurance]: {
    id: InsuranceProduct.BusinessInsurance,
    title: "Business Insurance",
    shortDescription: "Comprehensive coverage tailored for corporate entities, protecting against standard operational and commercial risks in the UAE.",
    tooltip: "All-in-one corporate protection for offices, liability, asset loss, and day-to-day operations under a single comprehensive policy.",
    heroTagline: "Secure Your UAE Business with All-In-One Enterprise Protection",
    longDescription: "Our comprehensive Business Insurance package shields your company from a broad range of operational risks, asset damages, and business interruptions. Tailored for larger enterprises as well as growing corporate entities, this policy ensures your business remains resilient against unforeseen legal liabilities or property loss.",
    benefits: [
      "Property & assets damage protection",
      "Comprehensive public and product liability coverage",
      "Business interruption cover to replace lost income during halts",
      "Machinery breakdown and electronic equipment protection",
      "Fidelity guarantee and money insurance included"
    ],
    faqs: [
      {
        question: "What is typically covered under a comprehensive Business Insurance policy in Dubai?",
        answer: "A comprehensive policy combines physical asset cover (offices, warehouses, stock), business interruption, public liability, and employer liability, safeguarding your entire balance sheet."
      }
    ],
    iconName: "Briefcase"
  },
  [InsuranceProduct.WorkmenCompensation]: {
    id: InsuranceProduct.WorkmenCompensation,
    title: "Workmen Compensation Insurance",
    shortDescription: "Mandatory UAE employer's liability cover for workplace injuries, medical expenses, and loss of earnings.",
    tooltip: "Mandatory legal coverage protecting your employees against occupational hazards, accidents, and medical claims in the UAE.",
    heroTagline: "Comply with UAE Labor Laws & Protect Your Workforce Securely",
    longDescription: "Workmen's Compensation Insurance is a legal mandate under UAE Federal Law No. 33 of 2021 (and subsequent amendments). It covers your legal liability as an employer to pay compensation, medical costs, and loss of wages to employees who suffer occupational injuries or contract diseases during their course of employment.",
    benefits: [
      "Strict compliance with UAE Ministry of Human Resources & Emiratisation (MOHRE)",
      "Covers accidental death and permanent/temporary disability of workers",
      "Pre-approved medical expense coverage at leading UAE hospitals",
      "Employer's Liability extensions up to AED 1,000,000 or more"
    ],
    faqs: [
      {
        question: "Is Workmen Compensation Insurance mandatory in Dubai?",
        answer: "Yes. Every employer in the UAE is legally required to cover their employees against work-related injuries, accidents, and deaths as per MOHRE rules."
      }
    ],
    iconName: "Users"
  },
  [InsuranceProduct.Property]: {
    id: InsuranceProduct.Property,
    title: "Property Insurance",
    shortDescription: "Protects your physical business assets, warehouses, machinery, and stock against fire, flood, and theft.",
    tooltip: "Covers physical structures, offices, warehouses, inventory, and fixtures against fire, natural disasters, and accidental damage.",
    heroTagline: "Safeguard Your Physical Assets, Inventory & Offices from Unforeseen Disasters",
    longDescription: "Whether you own or rent your office, retail store, or warehouse in the UAE, Property Insurance ensures that your physical assets are protected. This policy covers buildings, machinery, tenant improvements, stock, and office contents against sudden events like fires, lightning, explosions, storms, water damage, or burglary.",
    benefits: [
      "Full Fire and Allied Perils coverage tailored for UAE climates",
      "Reinstatement value cover for machinery, fixtures, and fittings",
      "First-loss theft and burglary protection"
    ],
    faqs: [
      {
        question: "Do I need Property Insurance if I am renting an office in Dubai?",
        answer: "Yes. While the landlord's building insurance covers the outer shell, you are responsible for insuring your own interior fit-outs, equipment, furniture, and stock."
      }
    ],
    iconName: "Building"
  },
  [InsuranceProduct.PublicLiability]: {
    id: InsuranceProduct.PublicLiability,
    title: "Public Liability Insurance",
    shortDescription: "Defends your business against third-party bodily injury or property damage claims arising from your operations.",
    tooltip: "Essential shield against third-party claims for bodily injury, accidental death, or damage to property during your business activities.",
    heroTagline: "Protect Your Business Against Third-Party Damage and Injury Claims",
    longDescription: "Public Liability Insurance is vital for any UAE business that interacts with clients, vendors, or members of the public. If an accident occurs on your premises (such as a slip-and-fall) or during your off-site operations, this cover manages legal defense fees, settlements, and court-awarded damages.",
    benefits: [
      "Covers legal costs, attorney fees, and investigation expenses",
      "High limit options ranging from AED 1,000,000 to AED 20,000,000+",
      "Tenant's Liability extensions for rented retail or commercial premises"
    ],
    faqs: [
      {
        question: "Is Public Liability required for retail businesses in UAE malls?",
        answer: "Yes, major malls (like Dubai Mall, Mall of the Emirates) require retail tenants to hold a minimum Public Liability limit (usually AED 5M or 10M) before trading."
      }
    ],
    iconName: "ShieldAlert"
  },
  [InsuranceProduct.Sme]: {
    id: InsuranceProduct.Sme,
    title: "SME Package Insurance",
    shortDescription: "Cost-effective, pre-packaged office and liability insurance designed specifically for UAE startups and SMEs.",
    tooltip: "Affordable, customized packages tailored for startups and small-to-medium businesses to cover basic fire, theft, and liability risks.",
    heroTagline: "Custom-Tailored, Affordable Insurance Packages for UAE Startups & SMEs",
    longDescription: "Our SME Business Shield is designed specifically for small-to-medium enterprises and startups in the UAE. We bundle office contents, business interruption, public liability, workmen compensation, and money-in-transit into a single, affordable, easy-to-manage policy so you can focus on scaling your business.",
    benefits: [
      "Pre-bundled packages with highly competitive premiums starting from AED 750/year",
      "Simple documentation with fast, hassle-free online approval",
      "Meets all UAE free-zone licensing requirements for trade license renewals"
    ],
    faqs: [
      {
        question: "How quickly can I get an SME Business Insurance policy issued?",
        answer: "We can issue standard SME policies within 1-2 hours of receiving your trade license and completed webform."
      }
    ],
    iconName: "TrendingUp"
  },
  [InsuranceProduct.ContractorAllRisk]: {
    id: InsuranceProduct.ContractorAllRisk,
    title: "Contractor's All Risk Insurance",
    shortDescription: "All-in-one protection for civil engineering, construction projects, and third-party liabilities during execution.",
    tooltip: "Comprehensive cover for contractors, covering physical damage to works, materials, machinery, and third-party liabilities during construction.",
    heroTagline: "All-Risk Project Protection for Contractors, Builders, and Developers",
    longDescription: "Contractor's All Risks (CAR) Insurance is a specialized, multi-risk policy designed for the UAE construction sector. It offers comprehensive protection against physical loss or damage to civil works, surrounding property, construction machinery, and third-party bodily injury arising during the execution of construction or engineering contracts.",
    benefits: [
      "Covers the permanent and temporary contract works (materials, labor)",
      "Protects expensive construction plant, machinery, and scaffolding",
      "Includes comprehensive Third-Party Liability (TPL) up to customized limits"
    ],
    faqs: [
      {
        question: "Is CAR insurance mandatory for securing municipal construction permits?",
        answer: "Yes, Dubai Municipality and other UAE local authorities require a valid Contractor's All Risk policy before issuing construction/excavation permits."
      }
    ],
    iconName: "HardHat"
  },
  [InsuranceProduct.MedicalMalpractice]: {
    id: InsuranceProduct.MedicalMalpractice,
    title: "Medical Malpractice Insurance",
    shortDescription: "Mandatory professional liability cover for Dubai and UAE healthcare practitioners, clinics, and hospitals.",
    tooltip: "Mandatory professional liability protection for healthcare professionals, clinics, and hospitals against clinical negligence claims.",
    heroTagline: "Protect Your Medical Career and Practice with Approved Clinical Liability Cover",
    longDescription: "Medical Malpractice Insurance is a strict statutory requirement in the UAE for all licensed healthcare practitioners (doctors, nurses, dentists, allied health professionals) and medical establishments. It protects against allegations of clinical negligence, professional errors, misdiagnosis, or treatment omissions.",
    benefits: [
      "Fully approved by DHA (Dubai Health Authority), MOHAP, and DOH Abu Dhabi",
      "Covers defense costs, professional legal representation, and settlement awards"
    ],
    faqs: [
      {
        question: "Is medical malpractice insurance mandatory for DHA license renewal?",
        answer: "Yes, you cannot renew your healthcare license with the Dubai Health Authority (DHA) or Department of Health (DOH) without submitting a valid Medical Malpractice policy."
      }
    ],
    iconName: "Stethoscope"
  },
  [InsuranceProduct.ProfessionalIndemnity]: {
    id: InsuranceProduct.ProfessionalIndemnity,
    title: "Professional Indemnity Insurance",
    shortDescription: "Protects consultants, architects, IT professionals, and advisors against errors, omissions, and negligence claims.",
    tooltip: "Shields advisors, architects, engineers, lawyers, and IT consultants from client lawsuits alleging negligent advice, error, or financial loss.",
    heroTagline: "Defend Your Expert Advice & Professional Integrity Against Lawsuits",
    longDescription: "If your UAE business provides expert services, consultancy, designs, or advice, you can be held legally liable for financial losses your clients suffer as a result of professional errors. Professional Indemnity (PI) Insurance safeguards your agency, consultancy, or practice.",
    benefits: [
      "Shields consultants, engineers, brokers, marketers, and IT experts",
      "Covers negligence, intellectual property infringement, and loss of client documents"
    ],
    faqs: [
      {
        question: "Which professions are legally required to hold PI Insurance in Dubai?",
        answer: "Real estate brokers (regulated by RERA), financial advisors (DFSA), insurance brokers, legal consultants, and engineering/architectural design consultants are legally mandated to have PI Insurance."
      }
    ],
    iconName: "ShieldCheck"
  },

  // Group 1: Protect My Business Assets
  [InsuranceProduct.PoliticalViolence]: {
    id: InsuranceProduct.PoliticalViolence,
    title: "Political Violence Insurance",
    shortDescription: "Protects business assets against terrorism, political riots, sabotage, and civil unrest.",
    tooltip: "Enhanced property cover for political riots, civil commotion, sabotage, and acts of terrorism.",
    heroTagline: "Guard Your Investments Against Political Risks and Civil Commotion",
    longDescription: "Political Violence Insurance provides comprehensive protection for commercial structures, warehouses, and valuable machinery against sabotage, riots, civil unrest, terrorism, and political instability inside municipal boundaries.",
    benefits: ["Covers political riot damages", "Business interruption loss due to political shutdown", "Protection for assets and cargo in transit"],
    faqs: [],
    iconName: "ShieldAlert"
  },
  [InsuranceProduct.HolidayHomes]: {
    id: InsuranceProduct.HolidayHomes,
    title: "Holiday Homes Insurance",
    shortDescription: "Specially designed package for short-term rental properties, covering landlords, tenants, and public liability.",
    tooltip: "Comprehensive holiday home cover protecting fixtures, furniture, landlord liabilities, and short-term tenant accidents.",
    heroTagline: "Secure Your Short-Term Rentals in Dubai's Growing Hospitality Market",
    longDescription: "Holiday Homes Insurance covers properties registered under DTCM (Dubai Tourism) for short-term leasing. It includes cover for luxury furniture, structural damages, alternative accommodation, and crucial public liability for vacation guests.",
    benefits: ["Meets DTCM mandatory license insurance specs", "Covers accidental tenant damages", "Landlord public liability for guest slips/falls"],
    faqs: [],
    iconName: "Home"
  },

  // Group 2: Cover My Employees
  [InsuranceProduct.GroupHealth]: {
    id: InsuranceProduct.GroupHealth,
    title: "Group Health Insurance",
    shortDescription: "Mandatory corporate medical insurance for employees with customized regional and global network covers.",
    tooltip: "Mandatory DHA & HAAD compliant corporate medical insurance tailored for your UAE employees and their families.",
    heroTagline: "DHA Compliant Employee Health Cover for Enterprise and SME Staff",
    longDescription: "Group Health Insurance provides medical, clinical, and inpatient/outpatient coverage for your workforce. In Dubai and Abu Dhabi, providing health insurance to all sponsored employees is a strict statutory obligation.",
    benefits: ["Fully DHA / MoHAP compliant policies", "Direct billing at premium networks of clinics and hospitals", "Optional maternity, dental, and optical covers"],
    faqs: [],
    iconName: "Heart"
  },
  [InsuranceProduct.GroupLife]: {
    id: InsuranceProduct.GroupLife,
    title: "Group Life Insurance",
    shortDescription: "Protects employee families with substantial death, permanent disability, and terminal illness benefits.",
    tooltip: "Provides peace of mind to your workforce by offering financial security to families in case of death or disability.",
    heroTagline: "Secure Your Employees' Families with Competitive Corporate Life Covers",
    longDescription: "Group Life Insurance covers your employees in case of accidental death, permanent total disability, and critical illnesses, helping attract and retain premium talent in the UAE.",
    benefits: ["Worldwide accidental coverage", "Generous multiples of salary or fixed payout options", "Easy onboarding with minimal medical underwriting"],
    faqs: [],
    iconName: "Activity"
  },
  [InsuranceProduct.GroupTravel]: {
    id: InsuranceProduct.GroupTravel,
    title: "Group Travel Insurance",
    shortDescription: "Covers corporate travel risks, trip cancellations, lost baggage, and overseas medical emergencies.",
    tooltip: "Comprehensive travel medical and logistics security for your executives and corporate travelers globally.",
    heroTagline: "Shield Your Employees on Global Business Missions with Premium Travel Coverage",
    longDescription: "Group Travel Insurance ensures corporate teams are covered for flight delays, medical emergencies, loss of passports, and luggage thefts during business travel.",
    benefits: ["Schengen visa pre-approved coverage", "Global 24/7 medical emergency help line", "Covers multi-trip travel for all registered staff"],
    faqs: [],
    iconName: "Plane"
  },

  // Group 3: Protect Against Lawsuits
  [InsuranceProduct.DirectorsOfficers]: {
    id: InsuranceProduct.DirectorsOfficers,
    title: "Directors & Officers Liability Insurance",
    shortDescription: "Protects board members and executives against personal litigation for managerial actions and decisions.",
    tooltip: "Critical personal asset defense for company directors against personal lawsuits alleging mismanagement or errors.",
    heroTagline: "Defend Your Corporate Officers and Leadership Against Personal Liability",
    longDescription: "D&O Insurance shields directors, officers, and board members from the heavy financial burdens of legal defense costs and settlements arising out of allegations of wrongful acts, breach of duty, or misleading statements in their executive roles.",
    benefits: ["Shields directors' personal properties and wealth", "Covers securities litigation and defense costs", "Protects against regulatory investigations"],
    faqs: [],
    iconName: "UserCheck"
  },
  [InsuranceProduct.ProductLiability]: {
    id: InsuranceProduct.ProductLiability,
    title: "Product Liability Insurance",
    shortDescription: "Protects manufacturers, distributors, and retailers against lawsuits for consumer injuries or property damage caused by products.",
    tooltip: "Defends against claims of injury or damage caused by defective products manufactured, supplied, or sold by your company.",
    heroTagline: "Ensure Consumer Trust with Bulletproof Product Liability Coverage",
    longDescription: "Product Liability covers legal costs, medical claims, and financial settlements if a commercial product your company sells, manufactures, or distributes causes bodily injury or property damage to users.",
    benefits: ["Covers food poisoning claims for F&B operators", "Handles product recall litigation support", "Covers wholesale distribution hazards"],
    faqs: [],
    iconName: "Package"
  },

  // Group 4: Protect My Revenue & Data
  [InsuranceProduct.TradeCredit]: {
    id: InsuranceProduct.TradeCredit,
    title: "Trade Credit Insurance",
    shortDescription: "Insures your commercial receivables against bad debts, client insolvencies, and non-payment risks.",
    tooltip: "Protects your accounts receivable against customer bankruptcy, payment default, and credit risk.",
    heroTagline: "Trade with Confidence in Local and Export Markets by Protecting Receivables",
    longDescription: "Trade Credit Insurance ensures that your B2B enterprise is protected if a major commercial client declares bankruptcy or fails to pay their trade invoices, securing your cash flow.",
    benefits: ["Allows secure trade expansion on open credit terms", "Enhances bank financing terms with insured receivables", "Deep financial credit insights on buyers"],
    faqs: [],
    iconName: "CreditCard"
  },
  [InsuranceProduct.CyberSecurity]: {
    id: InsuranceProduct.CyberSecurity,
    title: "Cyber Security Insurance",
    shortDescription: "Covers data breach response, ransom attacks, malware, business interruption, and regulatory cyber fines.",
    tooltip: "Comprehensive cyber risk shield covering ransomware, data recovery costs, legal fines, and privacy liabilities.",
    heroTagline: "Defend Your Digital Operations and Customer Data from Cyber Threats",
    longDescription: "Cyber Security Insurance provides vital coverage for data breaches, phishing attacks, ransomware extortion, and operational halts caused by network intrusions, covering recovery costs and client settlements.",
    benefits: ["Covers expensive forensic data recovery", "Includes ransomware negotiation and cyber extortion payments", "Covers GDPR and UAE Data Protection regulatory legal defense"],
    faqs: [],
    iconName: "Lock"
  },
  [InsuranceProduct.FidelityGuarantee]: {
    id: InsuranceProduct.FidelityGuarantee,
    title: "Fidelity Guarantee Insurance",
    shortDescription: "Protects your company against direct financial loss or stock theft resulting from employee dishonesty or fraud.",
    tooltip: "Covers internal fraud, cash embezzlement, and merchandise theft committed by your own employees.",
    heroTagline: "Protect Your Company Assets Against Internal Employee Theft and Fraud",
    longDescription: "Fidelity Guarantee covers financial losses or inventory thefts directly resulting from fraudulent or dishonest acts committed by employees during their employment with your firm.",
    benefits: ["Covers cash embezzlement by accountants", "Protects stock inside retail stores or warehouses against internal collusion", "Saves business capital from high-value internal fraud"],
    faqs: [],
    iconName: "FileText"
  },

  // Group 5: Cover My Projects & Construction
  [InsuranceProduct.ErectionAllRisk]: {
    id: InsuranceProduct.ErectionAllRisk,
    title: "Erection All Risk Insurance",
    shortDescription: "All-risk protection for the installation, testing, and commissioning of heavy machinery and plant.",
    tooltip: "Comprehensive cover for structural erection, mechanical installation, and testing of heavy machinery.",
    heroTagline: "Insure Complex Machinery Installations from Assembly to Operational Testing",
    longDescription: "Erection All Risks covers installation of turbine units, plant equipment, assembly of steel structures, and machinery lines, shielding builders against accidental drops, fires, and testing failures.",
    benefits: ["Covers structural assembly and installation works", "Covers commissioning and warm-testing phases of machinery", "Includes high-limit third-party liability"],
    faqs: [],
    iconName: "Hammer"
  },
  [InsuranceProduct.ContractorsPlant]: {
    id: InsuranceProduct.ContractorsPlant,
    title: "Contractors Plant & Machinery Insurance",
    shortDescription: "Covers excavators, cranes, generators, and specialized tools against physical damage on-site and in transit.",
    tooltip: "Specialized machinery cover protecting your heavy construction equipment, cranes, and site plants from physical damage.",
    heroTagline: "Safeguard Expensive Civil Equipment and Cranes Across UAE Sites",
    longDescription: "Contractors Plant & Machinery (CPM) covers heavy operational assets like mobile cranes, generators, scaffolding, and drilling rigs against site tip-overs, collapses, fires, and vandalism.",
    benefits: ["Covers on-site operational physical damages", "Theft or vandalism protection on active construction zones", "Machinery transit between logistics hubs covered"],
    faqs: [],
    iconName: "Wrench"
  },

  // Group 6: Insure Vehicles & Shipments
  [InsuranceProduct.MarineCargo]: {
    id: InsuranceProduct.MarineCargo,
    title: "Marine Cargo Insurance",
    shortDescription: "Protects your imported or exported goods against damage, loss, or theft during sea, air, or land transit.",
    tooltip: "Essential transit insurance covering wholesale goods, imports, and exports from port of origin to final warehouse.",
    heroTagline: "Secure Global Trade and Shipments Against Transit Accidents",
    longDescription: "Marine Cargo Insurance protects international and local transit shipments of merchandise, raw materials, or equipment by ocean freight, air transport, or overland trucks against damage or total loss.",
    benefits: ["Covers loading/unloading damages", "All-risks coverage including General Average and salvage contributions", "Compliance with international letters of credit (L/C) requirements"],
    faqs: [],
    iconName: "Ship"
  },
  [InsuranceProduct.YachtBoat]: {
    id: InsuranceProduct.YachtBoat,
    title: "Yacht, Boat & Jetski Insurance",
    shortDescription: "Covers private yachts, commercial charters, and jetskis against hull damage, marine salvage, and third-party liabilities.",
    tooltip: "Specialized marine hull coverage protecting sea vessels, luxury yachts, and commercial boats.",
    heroTagline: "Protect Your Marine Assets and Luxury Yachts in UAE Waters",
    longDescription: "Yacht and Boat Insurance covers physical hull damage, passenger injuries, salvage, and marine public liability inside territorial coastal waters of the Gulf.",
    benefits: ["Covers vessel hull and machinery repairs", "Third-party marine liability", "Covers luxury interior refits and crew members"],
    faqs: [],
    iconName: "Anchor"
  },
  [InsuranceProduct.MotorFleet]: {
    id: InsuranceProduct.MotorFleet,
    title: "Motor Fleet Insurance",
    shortDescription: "Cost-effective commercial motor insurance covering your company cars, vans, delivery bikes, and trucks under one policy.",
    tooltip: "Unified commercial motor insurance protecting all fleet cars, trucks, and delivery vehicles.",
    heroTagline: "Streamline and Protect Your Commercial Deliveries and Corporate Fleet",
    longDescription: "Motor Fleet Insurance covers multiple corporate transport vehicles, trucks, and logistics bikes under a single master policy, maximizing pricing discounts and easing claim registration.",
    benefits: ["Highly competitive fleet-wide insurance rates", "Includes third-party liability and comprehensive damage covers", "Includes coverage for delivery riders and cargo vans"],
    faqs: [],
    iconName: "Truck"
  },

  // Group 7: Specialized Covers
  [InsuranceProduct.EventInsurance]: {
    id: InsuranceProduct.EventInsurance,
    title: "Event Insurance",
    shortDescription: "Protects event organizers against event cancellations, venue damages, and public liabilities.",
    tooltip: "Covers cancellation losses, venue damage, and public liability for exhibitions, concerts, or weddings.",
    heroTagline: "Ensure Event Success by Protecting Against Cancellation and Liabilities",
    longDescription: "Event Insurance covers costs incurred during unexpected event cancellations, venue property damage, and legal public liability claims during high-profile corporate exhibitions, seminars, or live concerts.",
    benefits: ["Covers non-refundable venue and artist deposits", "Public liability for large scale public gatherings", "Equipment damage during stage setup"],
    faqs: [],
    iconName: "Calendar"
  },
  [InsuranceProduct.DroneInsurance]: {
    id: InsuranceProduct.DroneInsurance,
    title: "Drone Insurance",
    shortDescription: "Mandatory third-party liability and hull cover for commercial drones, fully approved by DCAA/GCAA.",
    tooltip: "Statutory drone insurance required by UAE aviation regulators for commercial drone flight permits.",
    heroTagline: "GCAA & DCAA Approved Drone Hull and Third-Party Liability Cover",
    longDescription: "Commercial Drone Insurance satisfies UAE legal requirements (GCAA/DCAA) for pilot licenses, drone registrations, and operations, covering mid-air collisions, camera loss, and third-party property damages.",
    benefits: ["Full compliance with DCAA/GCAA registration laws", "Covers expensive cinema cameras and drone hulls", "Third-party aviation liability protection"],
    faqs: [],
    iconName: "Radio"
  },
  [InsuranceProduct.JewelersBlock]: {
    id: InsuranceProduct.JewelersBlock,
    title: "Jewelers Block Insurance",
    shortDescription: "Highly specialized gold and jewelry cover shielding diamonds, gold, and precious gems in vaults, shops, or transit.",
    tooltip: "All-risks protection tailored for gold traders, jewelry retailers, and precious stone wholesalers.",
    heroTagline: "Protect High-Value Gems and Gold in Dubai's Famous Gold Souk",
    longDescription: "Jewelers Block Insurance is a comprehensive risk policy covering theft, armed robbery, and shipping losses for valuable jewelry shops, goldsmith workshops, and precious metal refineries.",
    benefits: ["All-risks cover including armed robbery and safe burglary", "Transit and showcase exhibition covers", "Vault security and shipping protection"],
    faqs: [],
    iconName: "Gem"
  },
  [InsuranceProduct.KidnapRansom]: {
    id: InsuranceProduct.KidnapRansom,
    title: "Kidnap & Ransom Insurance",
    shortDescription: "Covers corporate executives against kidnapping, extortion threats, and ransom payments in high-risk zones.",
    tooltip: "Protects high-net-worth individuals and corporate personnel with premium extortion response teams.",
    heroTagline: "Protect Corporate Leadership and Assets Against Kidnap and Extortion Threats",
    longDescription: "Kidnap & Ransom (K&R) covers crisis response specialist fees, ransom payments, rehabilitation, and liability losses arising from executive extortion threats globally.",
    benefits: ["Immediate access to world-leading crisis response experts", "Extortion threat expense reimbursement", "Ransom money delivery protection"],
    faqs: [],
    iconName: "Shield"
  },
  [InsuranceProduct.DefenseBasedAct]: {
    id: InsuranceProduct.DefenseBasedAct,
    title: "Defense Based Act (DBA) Insurance",
    shortDescription: "Mandatory worker compensation for contractors working on foreign US defense bases or governmental contracts.",
    tooltip: "Federal US worker compensation cover required for contractors on overseas defense sites.",
    heroTagline: "US Department of Labor Compliant DBA Insurance for UAE Contractors",
    longDescription: "DBA Insurance is a federal mandate for overseas contractors working on US defense bases, covering clinical treatment, disability, and death benefits under US Department of Labor regulations.",
    benefits: ["Strict US DOL compliance", "Medical evacuation from active threat zones", "Life and disability coverage for defense contract workers"],
    faqs: [],
    iconName: "Milestone"
  },
  [InsuranceProduct.ExtendedWarranties]: {
    id: InsuranceProduct.ExtendedWarranties,
    title: "Extended Warranties Insurance",
    shortDescription: "Insures consumer retailers and manufacturers against product failures after standard manufacturer warranty expires.",
    tooltip: "Underwrites commercial product warranty extensions offered to retail customers.",
    heroTagline: "Boost Customer Trust by Offering Insured Product Warranty Extensions",
    longDescription: "Extended Warranties Insurance underwrites and backs warranty policies sold by electronics or automotive retailers, managing claims for machinery breakdown after standard warranties lapse.",
    benefits: ["Underwritten commercial backing for customer warranty programs", "Covers replacement part costs and repair technician labor", "Boosts retail customer confidence"],
    faqs: [],
    iconName: "History"
  },
  [InsuranceProduct.Livestock]: {
    id: InsuranceProduct.Livestock,
    title: "Livestock Insurance",
    shortDescription: "Covers valuable racing camels, horses, dairy cattle, and falcons against accidental death, diseases, or transit injuries.",
    tooltip: "Specialized cover for high-value animals, horses, and falcons against mortality and accident risks.",
    heroTagline: "Safeguard Valuable Livestock, Racing Camels, and Equine Investments",
    longDescription: "Livestock Insurance provides specialized veterinary costs, theft protection, and mortality coverage for high-value animals, equestrian facilities, and racing camels in the UAE.",
    benefits: ["Mortality or disease outbreak protection", "Covers expensive veterinary surgery expenses", "Transit and tournament injury coverage"],
    faqs: [],
    iconName: "Dribbble"
  },
  [InsuranceProduct.BusinessInterruption]: {
    id: InsuranceProduct.BusinessInterruption,
    title: "Business Interruption Insurance",
    shortDescription: "Replaces lost operating profits and covers fixed rent and salaries during business shutdowns from insured perils.",
    tooltip: "Replaces lost commercial revenue and covers fixed overheads while your premises are closed due to fire/disaster.",
    heroTagline: "Secure Your Cash Flow and Pay Overheads Even During Operational Shutdowns",
    longDescription: "Business Interruption Insurance ensures you can pay staff salaries, rent, and overheads while your commercial facility is closed for repairs following physical fire, flood, or property damage.",
    benefits: ["Replaces lost gross profits", "Covers payroll and rent during business relocation", "Keeps operations afloat while structure is rebuilt"],
    faqs: [],
    iconName: "TrendingDown"
  },
  [InsuranceProduct.MoneyInsurance]: {
    id: InsuranceProduct.MoneyInsurance,
    title: "Money Insurance",
    shortDescription: "Covers loss of physical cash, cheques, and bills in transit, inside counter cash-drawers, or locked in safes.",
    tooltip: "Covers loss of physical cash or securities in safe, on-counter, or in-transit to banks.",
    heroTagline: "Shield Cash Assets Against Burglary, Robbery, and Transit Accidents",
    longDescription: "Money Insurance covers B2B cash or financial securities against armed robbery, safe break-ins, and transport robbery while being delivered to banks or payment collection points.",
    benefits: ["Covers cash-in-safe and cash-on-counter against theft", "Covers cash-in-transit with designated employees or security firms", "Handles replacement of damaged cheques and bonds"],
    faqs: [],
    iconName: "Coins"
  },
  [InsuranceProduct.MachineryBreakdown]: {
    id: InsuranceProduct.MachineryBreakdown,
    title: "Machinery Breakdown Insurance",
    shortDescription: "Covers electrical or mechanical failure of heavy production plant, escalators, server systems, and chillers.",
    tooltip: "Covers sudden mechanical or electrical breakdown of core factory and office machinery.",
    heroTagline: "Protect Expensive Manufacturing Plants and Office Systems Against Faults",
    longDescription: "Machinery Breakdown Insurance covers physical damage and repair costs of electrical or mechanical equipment resulting from short circuits, design errors, lack of lubrication, or physical breakdown.",
    benefits: ["Covers industrial motor rewinding and parts replacement", "Handles repair of central HVAC chillers or passenger elevators", "Minimizes equipment downtime loss"],
    faqs: [],
    iconName: "Cpu"
  },
  [InsuranceProduct.BankersBlanket]: {
    id: InsuranceProduct.BankersBlanket,
    title: "Bankers Blanket Bond Insurance",
    shortDescription: "All-in-one institutional crime and asset protection designed for commercial banks, investment firms, and brokers.",
    tooltip: "Comprehensive crime and asset defense policy tailored specifically for banking and financial institutions.",
    heroTagline: "Secure Bank Vaults, Credit Operations, and Transactions Against Crime",
    longDescription: "Bankers Blanket Bond protects financial entities against cash thefts, cyber thefts, stock fraud, forgery, transit robberies, and employee collusion, shielding the balance sheet against massive asset crimes.",
    benefits: ["Covers physical bank vaults and ATM burglaries", "Handles forgery, counterfeit currency, and security thefts", "Protects financial B2B transfers against heist risks"],
    faqs: [],
    iconName: "Lock"
  },
  [InsuranceProduct.SmePackage]: {
    id: InsuranceProduct.SmePackage,
    title: "SME Package Insurance",
    shortDescription: "Cost-effective, pre-packaged office and liability insurance designed specifically for UAE startups and SMEs.",
    tooltip: "Affordable, customized packages tailored for startups and small-to-medium businesses to cover basic fire, theft, and liability risks.",
    heroTagline: "Custom-Tailored, Affordable Insurance Packages for UAE Startups & SMEs",
    longDescription: "Our SME Business Shield is designed specifically for small-to-medium enterprises and startups in the UAE. We bundle office contents, business interruption, public liability, workmen compensation, and money-in-transit into a single, affordable, easy-to-manage policy.",
    benefits: [
      "Pre-bundled packages with highly competitive premiums starting from AED 750/year",
      "Simple documentation with fast, hassle-free online approval"
    ],
    faqs: [],
    iconName: "TrendingUp"
  },
  [InsuranceProduct.FireAndAllied]: {
    id: InsuranceProduct.FireAndAllied,
    title: "Fire & Allied Perils",
    shortDescription: "Covers loss or damage to business property caused by fire, lightning, explosion, storms, and floods.",
    tooltip: "Protects physical structures and assets from fire and associated natural hazards.",
    heroTagline: "Protect Your Commercial Assets Against Fire and Climatic Hazards",
    longDescription: "Fire and Allied Perils Insurance protects your business properties, inventory, and office fittings against structural disasters, sudden electrical fires, storm damage, and water leaks.",
    benefits: ["Covers physical fire and lightning damages", "Extended storm, tempest, flood, and burst pipe coverage", "Debris removal and fire-fighting expenses included"],
    faqs: [],
    iconName: "Flame"
  },
  [InsuranceProduct.PropertyAllRisk]: {
    id: InsuranceProduct.PropertyAllRisk,
    title: "Property All Risk",
    shortDescription: "All-inclusive property insurance protecting your physical business assets from accidental loss or damage.",
    tooltip: "Comprehensive all-risk cover for offices, warehouses, inventory, and physical equipment.",
    heroTagline: "Comprehensive Property All Risk Cover for Your Physical Investments",
    longDescription: "Property All Risks Insurance covers sudden, accidental, and unforeseen physical loss or damage to your commercial buildings, fixtures, machinery, and stock except for explicitly excluded items.",
    benefits: ["Broad coverage beyond basic fire hazards", "Includes burglary, accidental breakage, and impact damage", "Customized deductibles based on industry risk profiling"],
    faqs: [],
    iconName: "Building"
  },
  [InsuranceProduct.PropertyAllRiskBI]: {
    id: InsuranceProduct.PropertyAllRiskBI,
    title: "Property All Risk + Business Interruption",
    shortDescription: "Combines complete physical asset protection with financial loss compensation due to forced operations shutdown.",
    tooltip: "Protects physical assets and guarantees revenue replacement during repair shutdowns.",
    heroTagline: "Shield Your Assets and Cashflow with Dual Property & Interruption Protection",
    longDescription: "This integrated policy protects your physical infrastructure while covering fixed overheads, salaries, rent, and lost operating profits while your business is rebuilding after an insured disaster.",
    benefits: ["Saves your business balance sheet from complete cash-flow freezes", "Covers salaries, rent, and loan payments during down-times", "Integrated single-policy claims administration"],
    faqs: [],
    iconName: "Activity"
  },
  [InsuranceProduct.Marine]: {
    id: InsuranceProduct.Marine,
    title: "Marine Insurance",
    shortDescription: "Protects cargo, hulls, and marine liabilities across regional sea lanes and global shipping networks.",
    tooltip: "Comprehensive transit, shipping, and cargo damage protection.",
    heroTagline: "Secure Global Sea and Air Freight Cargo with Elite Marine Protection",
    longDescription: "Marine Cargo and Freight Insurance handles physical damage, loss, or theft of commercial trade goods during international shipping or overland transport to destination warehouses.",
    benefits: ["Saves capital from general average and salvage claims", "Schengen and international transit regulatory compliant", "Customizable import/export coverage limits"],
    faqs: [],
    iconName: "Ship"
  },
  [InsuranceProduct.Yacht]: {
    id: InsuranceProduct.Yacht,
    title: "Yacht Insurance",
    shortDescription: "Tailored hull and liability protection for luxury yachts, pleasure crafts, and marine watercraft.",
    tooltip: "Comprehensive yacht hull, machinery, and passenger liability coverage.",
    heroTagline: "Elite Hull & Liability Coverage for Luxury Yachts and Marine Craft",
    longDescription: "Yacht Insurance protects sea vessels against accidents, groundings, storms, fire, salvage, and high-limit passenger/third-party public liabilities in territorial waters.",
    benefits: ["Covers hull repairs, engines, and electrical systems", "Third-party marine liability included", "Covers premium onboard assets and crew members"],
    faqs: [],
    iconName: "Anchor"
  },
  [InsuranceProduct.PublicLiabilitySelect]: {
    id: InsuranceProduct.PublicLiabilitySelect,
    title: "Public Liability",
    shortDescription: "Covers third-party injury and property damage claims arising from day-to-day business operations.",
    tooltip: "Defends your business against third-party claims for accidental damage or bodily injuries.",
    heroTagline: "Protect Your Business Against Third-Party Claims & Lawsuits",
    longDescription: "Public Liability Insurance defends your enterprise if clients, visitors, or members of the public suffer injuries or property damages during your business operations.",
    benefits: ["Covers legal fees, settlements, and attorney retainers", "Meets landlord and UAE mall licensing requirements", "Tenant's liability extensions included"],
    faqs: [],
    iconName: "ShieldAlert"
  },
  [InsuranceProduct.ProductLiabilitySelect]: {
    id: InsuranceProduct.ProductLiabilitySelect,
    title: "Product Liability",
    shortDescription: "Protects against legal liability for consumer bodily injury or property damage caused by defective products.",
    tooltip: "Essential defense for manufacturers, retailers, and distributors of commercial goods.",
    heroTagline: "Shield Your Brand from Product Safety Claims and Negligence Lawsuits",
    longDescription: "Product Liability covers legal costs, health claims, and court settlements if a physical item your business manufactures, distributes, or sells causes injury or harm.",
    benefits: ["Covers design and manufacturing defect claims", "F&B food poisoning coverage extensions", "Global export liability options available"],
    faqs: [],
    iconName: "Package"
  },
  [InsuranceProduct.ProfessionalIndemnitySelect]: {
    id: InsuranceProduct.ProfessionalIndemnitySelect,
    title: "Professional Indemnity",
    shortDescription: "Covers consultants, advisors, and agencies against claims of professional errors, omissions, or negligence.",
    tooltip: "Defends your expert advice and services against client lawsuits for financial losses.",
    heroTagline: "Safeguard Your Expert Counsel and Agency Operations Against PI Claims",
    longDescription: "Professional Indemnity Insurance secures your consulting agency, architectural firm, law practice, or tech consultancy if a client sues for errors, omissions, or faulty designs.",
    benefits: ["Shields directors and consultants from professional errors", "Covers intellectual property infringement and document loss", "Fulfills mandatory UAE regulatory licensing requirements"],
    faqs: [],
    iconName: "ShieldCheck"
  },
  [InsuranceProduct.MedicalMalpracticeSelect]: {
    id: InsuranceProduct.MedicalMalpracticeSelect,
    title: "Medical Malpractice",
    shortDescription: "Mandatory clinical negligence and professional liability cover for UAE healthcare practitioners.",
    tooltip: "Mandatory medical liability protection for doctors, nurses, and medical facilities.",
    heroTagline: "Comply with DHA/DOH Regulations with Approved Medical Liability Cover",
    longDescription: "Medical Malpractice Insurance is legally required for all doctors, nurses, dentists, and clinics in the UAE. It covers clinical negligence, diagnosis errors, and surgical omissions.",
    benefits: ["Fully DHA, MoHAP, and DOH Abu Dhabi approved", "Covers defense costs and court-awarded settlements", "Protects clinical licenses and medical reputations"],
    faqs: [],
    iconName: "Stethoscope"
  },
  [InsuranceProduct.DirectorsOfficersSelect]: {
    id: InsuranceProduct.DirectorsOfficersSelect,
    title: "Directors & Officers Liability",
    shortDescription: "Protects board members and executives against personal litigation for management decisions.",
    tooltip: "Personal asset defense for corporate directors against managerial liability lawsuits.",
    heroTagline: "Defend Your Leadership Team and Personal Assets from Management Claims",
    longDescription: "D&O Insurance shields corporate leaders' personal assets from legal fees and settlements arising from allegations of wrongful management acts, breaches of duty, or misstatements.",
    benefits: ["Protects personal wealth and assets of directors", "Covers regulatory and corporate securities investigations", "Maintains strong corporate governance trust"],
    faqs: [],
    iconName: "UserCheck"
  },
  [InsuranceProduct.CommercialGeneralLiability]: {
    id: InsuranceProduct.CommercialGeneralLiability,
    title: "Commercial General Liability",
    shortDescription: "Comprehensive broad-form liability package combining public, product, and employer's liability coverages.",
    tooltip: "All-in-one general liability defense for complex corporate enterprises.",
    heroTagline: "Broad-Form Unified Liability Defense for Growing UAE Corporations",
    longDescription: "Commercial General Liability (CGL) bundles public liability, product liability, and key operational extensions to provide absolute protection against third-party legal claims.",
    benefits: ["Comprehensive, seamless multi-liability shield", "Covers marketing injuries, libel, and slander", "Highly customizable limits for multi-location businesses"],
    faqs: [],
    iconName: "Shield"
  },
  [InsuranceProduct.CyberRisk]: {
    id: InsuranceProduct.CyberRisk,
    title: "Cyber Risk Insurance",
    shortDescription: "Covers data breaches, phishing attacks, ransomware negotiation, business interruption, and system restoration costs.",
    tooltip: "Comprehensive cyber hazard and ransomware extortion shield for modern digital firms.",
    heroTagline: "Defend Your Tech Stack, Database, and Customer Privacy from Cyber Threats",
    longDescription: "Cyber Risk Insurance covers forensic data recovery, cyber extortion payouts, legal defense costs, and operational losses resulting from hackers, malware, or network breaches.",
    benefits: ["Covers expensive IT forensic audits and restorations", "Handles legal defense for regulatory GDPR/UAE Data Privacy breaches", "Reimburses lost revenue during ransomware shutdowns"],
    faqs: [],
    iconName: "Lock"
  },
  [InsuranceProduct.CommercialCrime]: {
    id: InsuranceProduct.CommercialCrime,
    title: "Commercial Crime Insurance",
    shortDescription: "Protects corporate capital and inventory from fraud, cash embezzlement, forgery, or cyber theft.",
    tooltip: "Covers high-value internal and external financial crimes and fraud.",
    heroTagline: "Protect Your Business Capital Against Fraud, Forgery, and Theft",
    longDescription: "Commercial Crime Insurance covers major financial losses arising from employee dishonesty, cash embezzlements, safe break-ins, wire fraud, and counterfeit currency.",
    benefits: ["Protects against multi-million dollar corporate fraud", "Covers physical and digital forgery of commercial documents", "Secures cash inside vaults and in-transit to banks"],
    faqs: [],
    iconName: "Coins"
  },
  [InsuranceProduct.ContractorAllRiskSelect]: {
    id: InsuranceProduct.ContractorAllRiskSelect,
    title: "Contractor's All Risk",
    shortDescription: "All-risk civil and construction project cover, including physical contract works, tools, and third-party liabilities.",
    tooltip: "Comprehensive construction and civil project protection for general contractors.",
    heroTagline: "All-Risk Project Protection for Contractors, Builders, and Developers",
    longDescription: "Contractor's All Risks (CAR) provides comprehensive protection against physical damages to contract works, materials, and third-party liabilities during active construction.",
    benefits: ["Covers permanent and temporary civil engineering works", "Protects site tools, scaffoldings, and surrounding properties", "Fulfills mandatory municipality permit requirements"],
    faqs: [],
    iconName: "HardHat"
  },
  [InsuranceProduct.ErectionAllRiskSelect]: {
    id: InsuranceProduct.ErectionAllRiskSelect,
    title: "Erection All Risk",
    shortDescription: "Insures mechanical installation, physical erection, and testing of machinery and factory plants.",
    tooltip: "Covers physical hazards during assembly, installation, and commissioning of heavy equipment.",
    heroTagline: "Protect Heavy Machinery and Engineering Plants from Assembly to Testing",
    longDescription: "Erection All Risks covers mechanical, electrical, and structural installations against accidental damages, drops, fires, and failures during warm testing phases.",
    benefits: ["Covers complex industrial plant assemblies", "Protects expensive machinery during warm-testing and startup", "Includes extensive third-party engineering liabilities"],
    faqs: [],
    iconName: "Hammer"
  },
  [InsuranceProduct.MachineryBreakdownSelect]: {
    id: InsuranceProduct.MachineryBreakdownSelect,
    title: "Machinery Breakdown",
    shortDescription: "Covers mechanical or electrical breakdowns of critical production plant, HVACs, and escalators.",
    tooltip: "Covers electrical or mechanical failure of operational machinery.",
    heroTagline: "Ensure Operational Continuity by Covering Costly Machinery Failures",
    longDescription: "Machinery Breakdown Insurance covers repair and replacement costs of core electrical/mechanical equipment due to short circuits, design flaws, or operational failures.",
    benefits: ["Covers industrial motor rewinding and specialized parts", "Covers central chillers, elevators, and server hardware", "Saves business from substantial unexpected maintenance bills"],
    faqs: [],
    iconName: "Cpu"
  },
  [InsuranceProduct.ContractorsPlantSelect]: {
    id: InsuranceProduct.ContractorsPlantSelect,
    title: "Contractors Plant & Machinery",
    shortDescription: "Covers heavy mobile equipment, cranes, generators, and site tools against physical damage.",
    tooltip: "Protects mobile cranes, excavators, and heavy site machinery from damage.",
    heroTagline: "Secure Expensive Cranes and On-Site Mobile Machinery Across UAE Projects",
    longDescription: "Contractors Plant & Machinery (CPM) covers heavy operational site equipment against tip-overs, collisions, landslide damage, water logging, or vandalism on active sites.",
    benefits: ["Broad physical damage cover for heavy mobile tools", "Covers machinery transit and equipment warehouse storage", "Site theft and vandalism protections included"],
    faqs: [],
    iconName: "Wrench"
  },
  [InsuranceProduct.WorkmenCompensationSelect]: {
    id: InsuranceProduct.WorkmenCompensationSelect,
    title: "Workmen Compensation",
    shortDescription: "Mandatory UAE employer's liability coverage for workplace accidents, injuries, and occupational medical claims.",
    tooltip: "Mandatory legal employee medical and accidental injury cover.",
    heroTagline: "DHA and MOHRE Compliant Employee Work Accident Cover",
    longDescription: "Workmen's Compensation handles legal liabilities to pay employee salaries, medical bills, or disability benefits following work-related injuries as per UAE Labor Laws.",
    benefits: ["Strict compliance with UAE MOHRE regulations", "Covers accidental death, temporary, or permanent disabilities", "Employer's liability extensions up to AED 1,000,000+ included"],
    faqs: [],
    iconName: "Users"
  },
  [InsuranceProduct.GroupTravelSelect]: {
    id: InsuranceProduct.GroupTravelSelect,
    title: "Group Travel",
    shortDescription: "Covers international travel risks, trip cancellations, lost baggage, and medical emergencies for employees.",
    tooltip: "Global medical and travel protection for corporate executives and staff.",
    heroTagline: "Stress-Free Global Business Trips for Your Entire Corporate Team",
    longDescription: "Group Travel Insurance secures corporate executives against flight cancellations, medical emergencies, passport losses, or luggage delays during overseas travel.",
    benefits: ["Schengen visa approved global coverage levels", "24/7 medical emergency assistance hotlines", "Simplifies multi-trip booking administrations"],
    faqs: [],
    iconName: "Plane"
  },
  [InsuranceProduct.PoliticalViolenceSelect]: {
    id: InsuranceProduct.PoliticalViolenceSelect,
    title: "Political Violence",
    shortDescription: "Protects business assets and real estate investments against riots, sabotage, and political unrest.",
    tooltip: "Enhanced asset protection for civil commotion, riots, and acts of sabotage.",
    heroTagline: "Protect Commercial Structures and Assets from Extreme Political Threats",
    longDescription: "Political Violence Insurance covers structural damages, warehouse losses, and shipping blockades caused by riots, terrorism, or political instability.",
    benefits: ["Covers severe civil commotion and riot damages", "Business interruption coverage extensions included", "Protects inventories and cargo-in-transit"],
    faqs: [],
    iconName: "ShieldAlert"
  }
};
