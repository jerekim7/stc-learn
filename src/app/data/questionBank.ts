export interface Question {
  id: string;
  dropWeek: number;
  tier: "Foundational" | "Applied" | "Strategic";
  category: "STC Governance" | "Investing & Markets" | "Personal Finance" | "Economics";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUESTION_BANK: Question[] = [
  // =========================================================================
  // DROP 01 (WEEK 1) - STC GOVERNANCE & EXECUTION FOUNDATIONS (20-60-20)
  // =========================================================================

  // --- Foundational (2 Questions - 20%) ---
  {
    id: "d1-q1",
    dropWeek: 1,
    tier: "Foundational",
    category: "STC Governance",
    prompt: "All 13 STC-Chama members contribute to the monthly ROSCA and EEF Core, but only 10 hold stakes in the Investment Unit (STC-IU). Why is this split completely constitutional?",
    options: [
      "The ROSCA & EEF Core is mandatory for all members, but the Investment Unit is voluntary per the Constitution",
      "The other 3 members were banned after showing up late in Cycle 2",
      "The Investment Unit has a lifetime quota of 10 seats to keep the WhatsApp calls manageable",
      "New members must spend two full years observing before touching group assets"
    ],
    correctIndex: 0,
    explanation: "Article 4.1 sets the rule: The ROSCA + EEF Core is our mandatory foundation[cite: 6]. The Investment Unit is an opt-in vehicle for members ready to lock in long-term capital under the IPS[cite: 6, 17]. We build discipline together first; we compound wealth by choice[cite: 4, 5]."
  },
  {
    id: "d1-q2",
    dropWeek: 1,
    tier: "Foundational",
    category: "Investing & Markets",
    prompt: "You want to invest personal savings directly into a Treasury Bill or Infrastructure Bond at primary auction, cutting out commercial bank custody and ledger fees. Which CBK platform lets you bid directly from your phone?",
    options: [
      "Ziidi Trader",
      "DhowCSD",
      "M-Akiba Quick-Lend",
      "CBK Loop"
    ],
    correctIndex: 1,
    explanation: "DhowCSD is the Central Bank of Kenya's retail portal that lets individual investors bid directly at primary government auctions, bypassing commercial bank custodial fees and markups."
  },

  // --- Applied (6 Questions - 60%) ---
  {
    id: "d1-q3",
    dropWeek: 1,
    tier: "Applied",
    category: "STC Governance",
    prompt: "Following the Summit 2026 resolution, monthly ROSCA contributions increased from KES 1,000 to KES 1,500. When it is your month to receive the pot in our 13-member cycle, what exact lump sum lands in your account?",
    options: [
      "KES 19,500 (13 × KES 1,500)",
      "KES 18,000 (12 × KES 1,500, since you are exempt from contributing in your payout month)",
      "KES 16,500 (the pot minus an automatic cut for an end-of-year dinner)",
      "KES 15,000 (standard payout with a delayed balance)"
    ],
    correctIndex: 1,
    explanation: "The ROSCA payout formula is (Total Members - 1) × Contribution[cite: 5]. Payout recipients are exempt from contributing during their payout month[cite: 5]. That is KES 18,000 of clean, zero-interest lump-sum capital hitting your account on the 27th[cite: 5]."
  },
  {
    id: "d1-q4",
    dropWeek: 1,
    tier: "Applied",
    category: "STC Governance",
    prompt: "To back the larger KES 18,000 ROSCA pot, STC instituted an additional EEF funding round of KES 600 per member (KES 200 bi-monthly or one-off). What does each member's cumulative baseline EEF capital stand at once completed?",
    options: [
      "KES 1,400",
      "KES 1,800",
      "KES 2,000",
      "KES 2,500"
    ],
    correctIndex: 2,
    explanation: "Members originally funded KES 1,400 per seat in Cycle 3[cite: 7]. The KES 600 top-up brings every member's permanent reserve stake to KES 2,000[cite: 7]. Sizing the safety net appropriately keeps the group calm so no single personal shock derails someone else's payout[cite: 7, 19]."
  },
  {
    id: "d1-q5",
    dropWeek: 1,
    tier: "Applied",
    category: "STC Governance",
    prompt: "Life happens and your cash is locked. Under STC's updated three-tier EEF policy, what is strictly required if you need emergency ROSCA coverage for the 3rd time in a single cycle?",
    options: [
      "The EEF Lead covers it automatically with zero questions asked",
      "Formal approval and vouching by at least two (2) active members",
      "Handing over your laptop or phone as collateral to the Group Lead",
      "Quietly exiting the group chat until the cycle resets"
    ],
    correctIndex: 1,
    explanation: "Tier 1 is automatic coverage[cite: 7]; Tier 2 requires speaking directly to the EEF Lead prior to the due date. Tier 3 requires two members to put their personal trust on the line to vouch for you. Accountability is the social fabric that keeps the EEF solvent."
  },
  {
    id: "d1-q6",
    dropWeek: 1,
    tier: "Applied",
    category: "STC Governance",
    prompt: "The 27th arrives, life hits, and the EEF covers your ROSCA contribution. What is your standard deadline to reimburse the fund before getting hit with a KES 200 fine and a late mark on the dashboard?",
    options: [
      "48 hours",
      "14 days (with a formal 14-day extension available if requested before the initial window expires)",
      "Whenever you feel like it before the next annual Summit",
      "Exactly 30 days, no exceptions"
    ],
    correctIndex: 1,
    explanation: "Article 5.1(c) sets the standard reimbursement window at 14 days[cite: 7]. If you communicate in advance, you can extend up to 28 days total[cite: 7]. Ghosting the deadline triggers a KES 200 fine and marks your record[cite: 7], which jeopardizes your Guarantor Status[cite: 6]."
  },
  {
    id: "d1-q7",
    dropWeek: 1,
    tier: "Applied",
    category: "Investing & Markets",
    prompt: "You log into your trading app (like Ziidi Trader) to buy shares of an NSE counter. Why is slapping a 'Market Order' on a thinly traded stock a rookie mistake compared to setting a 'Limit Order'?",
    options: [
      "Market orders are only allowed for institutional bank funds",
      "A market order matches against whatever ask prices are resting on the order book, risking nasty price slippage",
      "Market orders trigger double the statutory CMA regulatory levies",
      "Limit orders guarantee that you will receive dividends that exact week"
    ],
    correctIndex: 1,
    explanation: "A market order prioritizes speed over price certainty, sweeping whatever prices sellers are offering. A limit order caps your price ceiling. As an investor, you dictate your entry price rather than taking whatever the market serves up."
  },
  {
    id: "d1-q8",
    dropWeek: 1,
    tier: "Applied",
    category: "Economics",
    prompt: "A local Money Market Fund advertises a 13% gross annual return. With inflation at 6.8% and a 15% statutory withholding tax on interest, what is your true annual gain in actual purchasing power?",
    options: [
      "+6.20%",
      "+4.25%",
      "+11.05%",
      "-1.25%"
    ],
    correctIndex: 1,
    explanation: "Nominal return is vanity; net real return is sanity. After paying 15% tax, your nominal return is 13% × (1 - 0.15) = 11.05%. Subtracting 6.8% inflation leaves +4.25% in real purchasing power gain. Always do the math after taxes and inflation."
  },

  // --- Strategic Edge (2 Questions - 20%) ---
  {
    id: "d1-q9",
    dropWeek: 1,
    tier: "Strategic",
    category: "STC Governance",
    prompt: "The Investment Unit receives a dividend payment from its equity holdings, boosting total portfolio cash. What happens to each member's unit value before any new contribution round is called?",
    options: [
      "Current Unit Price increases because Total NAV expanded while total units in circulation remained the same",
      "The Treasurer must immediately disburse the cash via M-Pesa to everyone's pockets",
      "Total units double across the group while the unit price is halved",
      "The unit price drops so new members can enter at a discount"
    ],
    correctIndex: 0,
    explanation: "Unit Price = NAV / Units in Circulation[cite: 4]. Cash dividends increase the numerator without expanding the denominator, raising the value of every existing unit[cite: 4]. This is how a unitized system ensures compounding benefits existing holders without messy manual calculations[cite: 4, 13]."
  },
  {
    id: "d1-q10",
    dropWeek: 1,
    tier: "Strategic",
    category: "STC Governance",
    prompt: "Under the STC-MLP Capital Allocation Policy, why does STC sweep surplus profit out of the lending pool at cycle close instead of letting the cash sit in the lending account?",
    options: [
      "Because idle lending capital earns 0% interest, while redeploying surplus to the MMF or FIF earns 10% to 13%",
      "Because bank regulations ban holding more than KES 10,000 in a Chama mobile money wallet",
      "To fund an end-of-year executive bonus for the Investment Co-Leads",
      "Because borrower interest must legally be forfeited to charity after 12 months"
    ],
    correctIndex: 0,
    explanation: "Section 1 of the MLP Capital Allocation Policy highlights opportunity cost: an idle lending pool earns 0%[cite: 11]. After reserving Tier 1 (Capital Buffer) and Tier 2 (Growth Capital), Tier 3 surplus is redeployed into yield-generating portfolio assets (MMF/FIF) so idle money never sleeps[cite: 11]."
  },

  // =========================================================================
  // DROP 02 (WEEK 2) - DEBT, LIQUIDITY & CASH FLOW (20-60-20)
  // =========================================================================

  // --- Foundational (2 Questions - 20%) ---
  {
    id: "d2-q1",
    dropWeek: 2,
    tier: "Foundational",
    category: "Personal Finance",
    prompt: "A 'sinking fund' is money set aside regularly for a predictable future expense (like annual insurance or tech upgrades). How does this differ fundamentally from an emergency fund?",
    options: [
      "A sinking fund earns double the interest of an emergency fund",
      "An emergency fund is for unknown, urgent shocks; a sinking fund is for known, scheduled expenses",
      "A sinking fund can only be invested in high-risk crypto tokens",
      "An emergency fund is shared by a group, while a sinking fund is strictly personal"
    ],
    correctIndex: 1,
    explanation: "Emergency funds protect against unexpected shocks (medical events, sudden income disruption)[cite: 8]. Sinking funds smooth out predictable lumpy expenses across monthly cash flows so you don't raid your emergency reserves[cite: 8]."
  },
  {
    id: "d2-q2",
    dropWeek: 2,
    tier: "Foundational",
    category: "Personal Finance",
    prompt: "When clearing personal debts, what is the core psychological vs. mathematical trade-off between the 'Debt Snowball' and 'Debt Avalanche' methods?",
    options: [
      "Snowball attacks the smallest balance first for quick dopamine and momentum; Avalanche targets the highest interest rate first to minimize total money lost",
      "Snowball only works on bank overdrafts; Avalanche is strictly for Fuliza and digital lenders",
      "Snowball rolls all loans into one giant SACCO loan; Avalanche lets you ignore loans until letters arrive",
      "Snowball requires a formal guarantor; Avalanche is unsecured"
    ],
    correctIndex: 0,
    explanation: "The Debt Snowball prioritizes quick behavioral wins by clearing the smallest balance first. The Debt Avalanche is mathematically optimal, attacking the highest interest rate first to save the most money."
  },

  // --- Applied (6 Questions - 60%) ---
  {
    id: "d2-q3",
    dropWeek: 2,
    tier: "Applied",
    category: "STC Governance",
    prompt: "Under Article 4.3 of the Investment Unit Operating Rules, which of the following is a mandatory qualification for an STC member to take a loan from the Member Lending Program (MLP)?",
    options: [
      "They must have contributed at least KES 100,000 to the Investment Unit",
      "They must be an active IU member for at least 6 months and have completed at least one full ROSCA cycle or two months with a guarantor",
      "They must currently hold an elected leadership title in STC-Chama",
      "They must have won the ROSCA payout within the last 14 days"
    ],
    correctIndex: 1,
    explanation: "Article 4.3 requires at least 6 months of active membership in the Investment Unit and proof of financial discipline—either completing a full ROSCA cycle or 2 months of an active cycle with a vetted guarantor[cite: 3]."
  },
  {
    id: "d2-q4",
    dropWeek: 2,
    tier: "Applied",
    category: "STC Governance",
    prompt: "An STC member borrows KES 10,000 from the Member Lending Program (MLP) at the standard fixed interest rate of 12.5% for a 2-month repayment period. What total cash is due at maturity?",
    options: [
      "KES 10,000 (interest is forgiven if you attend all group meetings)",
      "KES 11,250",
      "KES 10,208",
      "KES 12,500"
    ],
    correctIndex: 2,
    explanation: "Under the MLP terms (reflected in Tip 2.1), a 12.5% annualized interest rate across a 2-month horizon results in approximately KES 208 in interest charges (KES 10,000 × 12.5% × 2/12)[cite: 3, 8], bringing the total due to ~KES 10,208[cite: 8]."
  },
  {
    id: "d2-q5",
    dropWeek: 2,
    tier: "Applied",
    category: "STC Governance",
    prompt: "What is the unemotional group protocol if a borrower on an STC Member Loan ghosts payment for more than 14 days after receiving a late notice?",
    options: [
      "The borrower is immediately sued in civil court",
      "The Investment Co-Leads review the situation and members vote on an extension, liquidating unit holdings, or writing off the loan",
      "The borrower's phone contacts receive an automated shaming blast",
      "The entire Investment Unit is permanently dissolved"
    ],
    correctIndex: 1,
    explanation: "Article 4.8 removes emotional drama[cite: 3]. After a 3-day notice and 14 days of default, members vote on one of three clear remedies: an extension plan, liquidating the member's unit holdings, or writing off the debt[cite: 3]."
  },
  {
    id: "d2-q6",
    dropWeek: 2,
    tier: "Applied",
    category: "Personal Finance",
    prompt: "A digital lender offers a 1-month emergency loan of KES 5,000 with an upfront 'facility fee' of 8% (KES 400), advertising '0% interest.' What is the approximate simple Annual Percentage Rate (APR) on this money?",
    options: [
      "8% APR (it's right there in the ad)",
      "16% APR",
      "96% APR",
      "4% APR"
    ],
    correctIndex: 2,
    explanation: "A fee of 8% charged for just one single month translates to a simple annualized rate of 8% × 12 months = 96% APR (and well over 150% if compounded). Flat monthly fees are how micro-lenders disguise predatory interest rates[cite: 8]."
  },
  {
    id: "d2-q7",
    dropWeek: 2,
    tier: "Applied",
    category: "Personal Finance",
    prompt: "Under the 'Two-Account Strategy' for personal cash flow, why is stashing your personal emergency buffer in a separate bank or M-Pesa account recommended over keeping it in your daily spending wallet?",
    options: [
      "To avoid bank excise duty on standard deposits",
      "To add friction and stop 'accidental' spending on impulse food delivery or weekend vibes while keeping the cash liquid for real shocks",
      "Because secondary accounts are legally immune to inflation",
      "To double your annual tax-free interest allowance"
    ],
    correctIndex: 1,
    explanation: "Separating emergency cash creates psychological and operational friction[cite: 8]. If emergency funds sit in your daily transactional wallet, routine spending gradually consumes your safety buffer[cite: 8]."
  },
  {
    id: "d2-q8",
    dropWeek: 2,
    tier: "Applied",
    category: "Economics",
    prompt: "If your salary or gig income reliably clears on the 30th, but STC ROSCA contributions are due at 8:00 AM on the 27th, what is the best strategy to stop sweating the deadline?",
    options: [
      "Rely on the EEF automatic shortfall coverage every single month",
      "Build a rolling 1-month cash buffer in your account so you pay this month's commitment using last month's money",
      "Petition the group to change the constitutional calendar every time your client delays payment",
      "Borrow from predatory mobile loan apps on the 26th"
    ],
    correctIndex: 1,
    explanation: "Cash flow mismatches cause preventable stress[cite: 8]. Building a one-month income buffer breaks the paycheck-to-paycheck cycle, allowing commitments due on the 27th to be settled comfortably from existing reserves[cite: 5, 8]."
  },

  // --- Strategic Edge (2 Questions - 20%) ---
  {
    id: "d2-q9",
    dropWeek: 2,
    tier: "Strategic",
    category: "STC Governance",
    prompt: "In the STC Member Lending Program, every loan requires a member with 'Guarantor Status.' What is the actual financial liability of the guarantor if the borrower completely defaults?",
    options: [
      "The guarantor faces zero financial liability; their signature is just a moral thumbs-up",
      "The guarantor is liable for only 50% of the principal balance",
      "The guarantor assumes full personal and financial responsibility for the complete outstanding balance plus accrued interest",
      "The guarantor's liability is capped at KES 500"
    ],
    correctIndex: 2,
    explanation: "Article 4.6(c) states that by guaranteeing a loan, the member assumes personal and financial responsibility for the full outstanding balance and accrued interest[cite: 3]. It is a real financial exposure, which is why guarantor trust is treated as sacred[cite: 8]."
  },
  {
    id: "d2-q10",
    dropWeek: 2,
    tier: "Strategic",
    category: "Personal Finance",
    prompt: "You hold KES 40,000 in an MMF earning 12% annual interest. You also have an outstanding digital loan of KES 40,000 accruing 3% per month. What is the mathematically sound capital allocation?",
    options: [
      "Keep the MMF untouched to earn compound interest and make minimum payments on the loan",
      "Liquidate the MMF to wipe out the loan immediately, as the debt costs ~36% annually versus the MMF's 12% yield",
      "Split your next month's salary 50/50 between the MMF and the loan",
      "Take another digital loan at 15% to pay off the 3% monthly loan"
    ],
    correctIndex: 1,
    explanation: "Earning 12% a year while paying ~36% simple APR (3% monthly) creates an annual net loss of 24% on that capital. Paying off high-interest debt provides a guaranteed, risk-free return equal to the interest rate avoided[cite: 8]."
  }
];

export function getDropByWeek(weekNumber: number): Question[] {
  return QUESTION_BANK.filter((q) => q.dropWeek === weekNumber);
}