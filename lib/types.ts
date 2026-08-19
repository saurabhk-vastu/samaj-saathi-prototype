export type MatchPreferences = {
  ageMin: number;
  ageMax: number;
  openToOtherCaste: string;
  /** @deprecated prefer states */
  city?: string;
  states: string[];
  maritalStatus: string;
  motherTongue: string;
  motherTongues: string[];
  monthlySalary: string;
  occupation: string;
  education: string;
  educations: string[];
  heightMin: string;
  heightMax: string;
  /** When true / "All Ok", ignore height filter */
  heightAllOk: boolean;
  diet: string;
  mangalDosh: string;
};

export type MatchLookingFor = {
  ageMin: number;
  ageMax: number;
  location: string;
  height: string;
  diet: string;
  maritalStatus: string;
  motherTongue: string;
  mangalDosh: string;
  occupation: string;
  monthlySalary: string;
  education: string;
};

export type ProfileState = {
  language: string;
  mobile: string;
  profileFor: string;
  gender: string;
  religion: string;
  caste: string;
  openToOtherCaste: string;
  motherTongue: string;
  name: string;
  dateOfBirth: string;
  city: string;
  height: string;
  diet: string;
  maritalStatus: string;
  mangalDosh: string;
  birthTime: string;
  placeOfBirth: string;
  occupation: string;
  monthlySalary: string;
  companyLocation: string;
  companyName: string;
  education: string;
  whatsappOptIn: boolean | null;
  profilePhoto: string | null;
  profilePhotos: (string | null)[];
  about: string;
  fatherStatus: string;
  motherStatus: string;
  familyPlace: string;
  familyMonthlySalary: string;
  familyProperty: string;
  familyType: string;
  siblings: string;
  drinksAlcohol: string;
  smokes: string;
  healthIssue: string;
  disability: string;
  isPremium: boolean;
  /** Set only after user completes recharge from Home → Recharge now */
  hasRecharged: boolean;
  idVerified: boolean;
  /** Phone number privacy — open to all India (prefer nearby) vs nearby only */
  locationPrivacy: "all-india" | "nearby";
  matchPreferences: MatchPreferences;
  likedIds: string[];
  shortlistedIds: string[];
  contactedIds: string[];
};

export type MatchProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  /** Shown on cards & Occupation section — e.g. Private Company, Government Job */
  occupation: string;
  education: string;
  community: string;
  motherTongue: string;
  height: string;
  diet: string;
  maritalStatus: string;
  mangalDosh: string;
  salary: string;
  companyLocation: string;
  companyName: string;
  profileFor: string;
  religion: string;
  verified: boolean;
  activeLabel: string;
  activeRank: number;
  isNew: boolean;
  about: string;
  lookingFor: string;
  preferences: MatchLookingFor;
  family: string;
  lifestyle: string[];
  photos: string[];
  kundli: string;
  phone: string;
};

export type ChatThread = {
  id: string;
  matchId: string;
  lastMessage: string;
  time: string;
  unread: number;
  /** Primary = both sides chatting; Sent = outgoing request, no reply yet */
  folder: "primary" | "sent";
  status?: "pending" | "rejected";
  messages: { from: "them" | "me"; text: string; time: string }[];
};
