export interface EquipmentItem {
  id: string;
  t: string;
  d: string;
  img: string;
  alt: string;
}

export interface SupplementItem {
  id: string;
  t: string;
  d: string;
  p: string;
  img: string;
  alt: string;
}

export interface TrainerItem {
  id: string;
  t: string;
  d: string;
  c: string;
  img: string;
  alt: string;
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
  mapImg: string;
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
  name: "IRON PULSE 3D",
  headline: "FORGE YOUR<br>ULTIMATE PHYSIQUE",
  tagline:
    "Next-generation 24/7 athletic performance center equipped with Olympic steel, smart biomechanics, and elite recovery suites.",
  about:
    "At Iron Pulse 3D, we combine raw intensity with cutting-edge training technology. Designed for athletes, lifters, and fitness enthusiasts who refuse average results, our 15,000 sq. ft. facility features custom-calibrated equipment, climate-controlled turf zones, and world-class personal training.",
  heroImg:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
  aboutImg:
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80",
  mapImg:
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
  stats: [
    ["15K+", "Sq. Ft. Floor"],
    ["24/7", "Member Access"],
    ["100%", "Custom Steel"],
  ],
  ticker: ["Strength", "Conditioning", "Hypertrophy", "Recovery", "Community"],
  equipment: [
    {
      id: "eq-1",
      t: "Olympic Power Racks",
      d: "Heavy-duty laser-cut steel racks with safety bars, band pegs, and multi-grip pull-up stations.",
      img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      alt: "Olympic power rack with loaded barbell and weight plates",
    },
    {
      id: "eq-2",
      t: "Dual Cable Crossover",
      d: "Pin-selected dual pulley system with adjustable height column for multi-plane movement patterns.",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      alt: "Dual cable crossover machine inside modern gym floor",
    },
    {
      id: "eq-3",
      t: "Smart Cardio Zone",
      d: "Touchscreen treadmills, curved self-powered runners, stairmasters, and concept2 rowers.",
      img: "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80",
      alt: "Row of high-tech treadmill machines in gym cardio suite",
    },
    {
      id: "eq-4",
      t: "Functional Turf Rig",
      d: "30-meter sprint turf track, sled push tracks, battle ropes, slam balls, and cast iron kettlebells.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      alt: "Functional turf area with kettlebells and workout equipment",
    },
    {
      id: "eq-5",
      t: "Hammer Strength Line",
      d: "Iso-lateral plate-loaded leg press, hack squat, chest press, and incline row machines.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      alt: "Plate loaded heavy leg press and strength machine",
    },
    {
      id: "eq-6",
      t: "Infrared Sauna & Recovery",
      d: "Therapeutic infrared heat recovery cabins, cold plunge tubs, and Theragun massage stations.",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury wellness sauna and contrast plunge recovery area",
    },
  ],
  supplements: [
    {
      id: "sp-1",
      t: "100% Whey Isolate",
      d: "25g pure ultra-filtered whey protein isolate with added digestive enzymes and zero sugar.",
      p: "$59.99",
      img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
      alt: "100 percent Whey Isolate protein tub",
    },
    {
      id: "sp-2",
      t: "HyperDrive Pre-Workout",
      d: "Clinical strength pre-workout formula with 6g L-Citrulline, 3.2g Beta-Alanine, and caffeine.",
      p: "$44.99",
      img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80",
      alt: "Pre-workout energy formula container",
    },
    {
      id: "sp-3",
      t: "Pure Creatine Monohydrate",
      d: "500g unflavored 100% micronized pharmaceutical grade creatine for strength and power output.",
      p: "$29.99",
      img: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80",
      alt: "Micronized creatine monohydrate tub",
    },
    {
      id: "sp-4",
      t: "Intra-Workout BCAA & Hydration",
      d: "2:1:1 branched-chain amino acids infused with coconut water electrolytes and Himalayan pink salt.",
      p: "$34.99",
      img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80",
      alt: "Intra-workout BCAA drink shaker and tub",
    },
  ],
  trainers: [
    {
      id: "tr-1",
      t: "Marcus Vance",
      d: "Head Strength & Power Coach",
      c: "CSCS • 10+ Yrs Bodybuilding & Powerlifting",
      img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
      alt: "Marcus Vance strength coach portrait",
    },
    {
      id: "tr-2",
      t: "Elena Rostova",
      d: "Functional Mobility Specialist",
      c: "NASM CPT • Mobility Specialist & Pilates Master",
      img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80",
      alt: "Elena Rostova athletic trainer portrait",
    },
    {
      id: "tr-3",
      t: "David Sterling",
      d: "Hypertrophy & Physique Lead",
      c: "IFBB Pro • Contest Prep & Macro Nutrition Specialist",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      alt: "David Sterling hypertrophy coach portrait",
    },
    {
      id: "tr-4",
      t: "Maya Lin",
      d: "HIIT & Conditioning Specialist",
      c: "EXOS Performance Specialist • Track & Field Coach",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
      alt: "Maya Lin athletic conditioning trainer portrait",
    },
  ],
  plans: [
    { id: "pl-1", t: "Flex Monthly Pass", p: "$49/mo" },
    { id: "pl-2", t: "Pro Athlete Annual", p: "$39/mo", hot: true },
    { id: "pl-3", t: "VIP All-Access + Recovery", p: "$79/mo" },
  ],
  planFeatures: [
    "24/7 Full Keycard Gym Access",
    "All Olympic Platforms & Heavy Racks",
    "Complimentary Towel & Locker Service",
    "Access to Member App & Workout Logs",
  ],
  reviews: [
    {
      id: "rv-1",
      q: "The dumbbell selection and plate-loaded leg machines are top tier. Best environment for serious lifters in the city.",
      n: "Alex Rivera – Competitive Powerlifter",
    },
    {
      id: "rv-2",
      q: "Incredible 24/7 facility! The infrared sauna and contrast plunge after a heavy leg workout is a total gamechanger.",
      n: "Sarah Jenkins – Marathon Runner",
    },
    {
      id: "rv-3",
      q: "Coach Marcus helped me fix my deadlift technique and add 40lbs to my total in 12 weeks. High energy atmosphere!",
      n: "Michael Chang – Member since 2024",
    },
  ],
  contact:
    "742 Iron Pulse Boulevard<br>Metro District, NY 10001<br>Phone: (555) 382-9000<br>Hours: 24 Hours / 7 Days A Week",
  social: ["Instagram", "Facebook", "YouTube"],
};
