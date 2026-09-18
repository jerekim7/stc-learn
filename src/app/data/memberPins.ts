export interface MemberSeat {
  pin: string;
  name: string;
  seatNumber: number;
}

export const STC_MEMBER_ROSTER: Record<string, MemberSeat> = {
  "4192": { pin: "4192", name: "Allan Mwiti", seatNumber: 1 },
  "8305": { pin: "8305", name: "Asaph Kariuki", seatNumber: 2 },
  "2741": { pin: "2741", name: "Carlos Mutua", seatNumber: 3 },
  "6058": { pin: "6058", name: "Chris Gitau", seatNumber: 4 },
  "9124": { pin: "9124", name: "Darren Tanui", seatNumber: 5 },
  "3580": { pin: "3580", name: "Emmanuel Mbatia", seatNumber: 6 },
  "1048": { pin: "1048", name: "Jeremy Kimingiri", seatNumber: 7 },
  "7263": { pin: "7263", name: "Joshua Rebo", seatNumber: 8 },
  "4819": { pin: "4819", name: "Kipleting Keino", seatNumber: 9 },
  "5397": { pin: "5397", name: "Michael Kiprop", seatNumber: 10 },
  "1936": { pin: "1936", name: "Michael Trevis", seatNumber: 11 },
  "8472": { pin: "8472", name: "Ryan Ngetich", seatNumber: 12 },
  "6204": { pin: "6204", name: "Sammy Kimaiyo", seatNumber: 13 },
  "0000": { pin: "0000", name: "Guest", seatNumber: 0 }
};

export function verifyMemberPin(pin: string): MemberSeat | null {
  return STC_MEMBER_ROSTER[pin] || null;
}
