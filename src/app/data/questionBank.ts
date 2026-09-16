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
  // WEEK 01 QUICKFIRE - GENERAL FINANCIAL FOUNDATIONS + STC CONTEXT (20-60-20)
  // =========================================================================

  {
    id: "d1-q1",
    dropWeek: 1,
    tier: "Foundational",
    category: "Personal Finance",
    prompt: "You have KES 2,000 left this month. You spend it on new shoes instead of saving it. What is the opportunity cost of the shoes?",
    options: [
      "The price of the shoes",
      "The money you could have saved",
      "The tax you paid",
      "The discount you missed"
    ],
    correctIndex: 1,
    explanation: "Opportunity cost is what you give up when choosing one option over another. Every financial decision has one."
  },
  {
    id: "d1-q2",
    dropWeek: 1,
    tier: "Foundational",
    category: "Personal Finance",
    prompt: "You know car insurance costs KES 24,000 every year. What is the best way to prepare for it?",
    options: [
      "Wait until renewal and find the money",
      "Put aside KES 2,000 every month",
      "Borrow when the bill arrives",
      "Use your emergency fund"
    ],
    correctIndex: 1,
    explanation: "A sinking fund is money deliberately set aside for a known future expense. An emergency fund is for things you didn't see coming. Annual insurance is not an emergency."
  },
  {
    id: "d1-q3",
    dropWeek: 1,
    tier: "Applied",
    category: "Personal Finance",
    prompt: "Your salary rises from KES 40,000 to KES 55,000. Months later, you have about the same amount left over as before. What likely happened?",
    options: [
      "Inflation disappeared",
      "Your savings became more efficient",
      "Your lifestyle expanded with your income",
      "Your bank reduced your salary"
    ],
    correctIndex: 2,
    explanation: "Lifestyle inflation is spending rising with income. Higher income can improve your life without improving your finances if every extra shilling gets a job."
  },
  {
    id: "d1-q4",
    dropWeek: 1,
    tier: "Applied",
    category: "Personal Finance",
    prompt: "Two loans are the same size and duration. Loan A charges 12% interest with no extra fees. Loan B charges 10% plus several fees. What should you compare before choosing?",
    options: [
      "Only the interest rate",
      "The total cost of borrowing",
      "Which lender has the nicer app",
      "Only the monthly payment"
    ],
    correctIndex: 1,
    explanation: "The headline rate isn't the whole story. Compare the total cost, including fees and other charges."
  },
  {
    id: "d1-q5",
    dropWeek: 1,
    tier: "Applied",
    category: "Investing & Markets",
    prompt: "You have KES 100,000 to invest. Which portfolio has less concentration risk?",
    options: [
      "KES 100,000 in one company",
      "KES 50,000 in two companies in the same industry",
      "KES 50,000 in equities and KES 50,000 across other assets",
      "KES 100,000 in whichever stock your friend recommends"
    ],
    correctIndex: 2,
    explanation: "Diversification means not relying too heavily on one investment, company, sector, or asset. It doesn't eliminate risk, but it can prevent one bad outcome from wrecking your portfolio."
  },
  {
    id: "d1-q6",
    dropWeek: 1,
    tier: "Applied",
    category: "Economics",
    prompt: "Your savings earn 6% while inflation is 8%. What happened to your purchasing power?",
    options: [
      "It increased",
      "It stayed the same",
      "It decreased",
      "There isn't enough information"
    ],
    correctIndex: 2,
    explanation: "If your money grows slower than prices, its purchasing power falls. A positive return isn't automatically a positive real return."
  },
  {
    id: "d1-q7",
    dropWeek: 1,
    tier: "Applied",
    category: "Investing & Markets",
    prompt: "You want to buy a share, but only if the price is KES 50 or lower. Which order would you use?",
    options: [
      "Market order",
      "Limit order",
      "Dividend order",
      "Stop-loss order"
    ],
    correctIndex: 1,
    explanation: "A limit order lets you specify the maximum price you're willing to pay when buying. A market order prioritizes execution, not an exact price."
  },
  {
    id: "d1-q8",
    dropWeek: 1,
    tier: "Strategic",
    category: "Investing & Markets",
    prompt: "A company reports strong results, but its share price falls the next day. Which could explain this?",
    options: [
      "Investors expected even better results",
      "The company automatically lost value",
      "Good companies cannot have falling share prices",
      "Markets only reward companies that make losses"
    ],
    correctIndex: 0,
    explanation: "Share prices reflect expectations, not just whether news is good or bad. A company can perform well and its share price can still fall if investors expected even better."
  },
  {
    id: "d1-q9",
    dropWeek: 1,
    tier: "Strategic",
    category: "STC Governance",
    prompt: "What is the clearest difference between a ROSCA and an IU?",
    options: [
      "ROSCA saves money; IU provides loans",
      "ROSCA is for pooled investing; IU is for monthly saving",
      "ROSCA (merry-go-round) builds saving discipline and scheduled cash flow; IU (Investment Unit) pools capital for investment",
      "They are essentially the same system"
    ],
    correctIndex: 2,
    explanation: "A ROSCA builds saving discipline and scheduled cash flow, while an IU pools capital for investment. Different financial tools can have different jobs."
  },
  {
    id: "d1-q10",
    dropWeek: 1,
    tier: "Strategic",
    category: "STC Governance",
    prompt: "STC-IU's group risk assessment resulted in a target allocation of 58.5% Growth and 41.5% Stability. Why not put 100% into Growth?",
    options: [
      "It would be illegal",
      "The fund's risk profile calls for both Growth and Stability",
      "Stability investments always outperform Growth investments",
      "The allocation was chosen randomly"
    ],
    correctIndex: 1,
    explanation: "STC-IU's allocation is linked to the group's risk profile, not simply to chasing the highest possible return."
  }
];
