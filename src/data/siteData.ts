export interface EquipmentItem {
  id: string;
  t: string;
  d: string;
  img?: string;
}

export interface SupplementItem {
  id: string;
  t: string;
  d: string;
  p: string;
  img?: string;
}

export interface TrainerItem {
  id: string;
  t: string;
  d: string;
  c: string;
  img?: string;
}

export interface PlanItem {
  id: string;
  t: string;
  p: string;
  hot?: boolean;
}

export interface ReviewItem {
  id: string;
  q: string;
  n: string;
}

export interface SiteData {
  name: string;
  headline: string;
  tagline: string;
  about: string;
  heroImg: string;
  aboutImg: string;
  stats: [string, string][];
  ticker: string[];
  equipment: EquipmentItem[];
  supplements: SupplementItem[];
  trainers: TrainerItem[];
  plans: PlanItem[];
  planFeatures: string[];
  reviews: ReviewItem[];
  contact: string;
  social: string[];
}

export const initialSiteData: SiteData = {
  name: "GYM NAME",
  headline: "Your headline<br>goes here",
  tagline: "Placeholder tagline. Replace with your gym's one-line promise.",
  about:
    "Placeholder copy. Tell the story of the gym: who it's for, what makes it different, and what members can expect.",
  heroImg: "",
  aboutImg: "",
  stats: [
    ["00", "Stat label"],
    ["00", "Stat label"],
    ["00", "Stat label"],
  ],
  ticker: ["Strength", "Conditioning", "Community", "Recovery"],
  equipment: [1, 2, 3, 4, 5, 6].map((i) => ({
    id: `eq-${i}`,
    t: `Equipment name ${i}`,
    d: "Short description placeholder.",
    img: "",
  })),
  supplements: [1, 2, 3, 4].map((i) => ({
    id: `sp-${i}`,
    t: `Product name ${i}`,
    d: "Product description placeholder.",
    p: "Price TBD",
    img: "",
  })),
  trainers: [1, 2, 3, 4].map((i) => ({
    id: `tr-${i}`,
    t: "Trainer name",
    d: "Specialty placeholder",
    c: "Credentials to be provided",
    img: "",
  })),
  plans: [
    { id: "pl-1", t: "Plan name A", p: "Price TBD" },
    { id: "pl-2", t: "Plan name B", p: "Price TBD", hot: true },
    { id: "pl-3", t: "Plan name C", p: "Price TBD" },
  ],
  planFeatures: [
    "Feature placeholder",
    "Feature placeholder",
    "Feature placeholder",
  ],
  reviews: [1, 2, 3].map((i) => ({
    id: `rv-${i}`,
    q: "Review text placeholder. Replace with a real member review.",
    n: "Member name",
  })),
  contact:
    "Address line placeholder<br>City, Postcode<br>Phone: +00 000 000 0000<br>Hours: to be provided",
  social: ["Instagram", "Facebook", "YouTube"],
};
