export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  accuracy: string;
  pace: string;
  title?: string;
}

export interface WeeklyLeaderboardConfig {
  cycle: string;
  weekNumber: number;
  theme: string;
  deadline: string;
  isPublished: boolean; // Set to true once all runs are audited
  standings: LeaderboardEntry[];
  pendingMembers: string[];
}

export const activeLeaderboard: WeeklyLeaderboardConfig = {
  cycle: "Cycle 4",
  weekNumber: 1,
  theme: "Chama Governance, Liquidity & Market Execution",
  deadline: "Wednesday, 11:59 PM EAT",
  isPublished: false, // Default is false: shows the holding/auditing screen
  standings: [
    // Populate once the drop closes
  ],
  pendingMembers: [
    "Allan Mwiti",
    "Asaph Kariuki",
    "Carlos Mutua",
    "Chris Gitau",
    "Darren Tanui",
    "Emmanuel Mbatia",
    "Jeremy Kimingiri",
    "Joshua Rebo",
    "Kipleting Keino",
    "Michael Kiprop",
    "Michael Trevis",
    "Ryan Ngetich",
    "Sammy Kimaiyo"
  ]
};