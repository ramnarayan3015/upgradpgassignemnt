export const SITE = {
  name: "The Leo",
  fullName: "The Leo Seafood & Chop House",
  tagline: "Every plate begins with imagination.",
  address: { line1: "162 Enterprise Blvd", line2: "Unionville, ON L6G 0A2", area: "Downtown Markham" },
  phone: "(365) 559-0049",
  phoneHref: "tel:+13655590049",
  email: "info@theleorestaurant.com",
  instagram: "https://www.instagram.com/theleorestaurant/",
  instagramHandle: "@theleorestaurant",
  reserveUrl: "https://www.yelp.com/reservations/the-leo-markham/?from_reserve_now=1",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Leo+162+Enterprise+Blvd+Markham+ON+L6G+0A2",
  mapsEmbed: "https://www.google.com/maps?q=162+Enterprise+Blvd,+Unionville,+ON+L6G+0A2&z=16&output=embed",
  hours: [
    { days: "Sunday, Wednesday, Thursday", time: "5 pm to 9 pm" },
    { days: "Friday and Saturday", time: "5 pm to 10 pm" },
    { days: "Monday and Tuesday", time: "Closed" },
  ],
};

export interface Dish {
  name: string;
  description: string;
  price?: number;
}
export interface MenuSection {
  id: string;
  title: string;
  note?: string;
  items: Dish[];
}

export const MENU: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      { name: "Bread Service", description: "Whipped tallow butter", price: 12 },
      { name: "Hokkaido Sea Scallop Ceviche", description: "Lemongrass, fish sauce, cucamelon, cilantro", price: 24 },
      { name: "Wagyu Carpaccio", description: "Ssamjang aioli, pickled mushroom, crispy rice", price: 28 },
      { name: "Chicken Liver Parfait", description: "Asian pear, cured egg, shokupan toast", price: 22 },
      { name: "Crab Cake", description: "Sichuan aioli, watercress salad", price: 39 },
      { name: "Caesar Salad", description: "Thai basil, lime, parmigiano reggiano", price: 20 },
      { name: "Typhoon Shelter Eggplant", description: "Dashi glaze, typhoon shelter crumbs", price: 16 },
      { name: "Lobster Pao Fan Soup", description: "Lobster meat, lobster stock, crispy rice", price: 19 },
    ],
  },
  {
    id: "land",
    title: "Land",
    note: "Canadian Prime and Australian Wagyu, cut for the table and finished over the flame. Served with your choice of sauce: Singapore chili, ginger chimichurri or lemongrass bearnaise.",
    items: [],
  },
  {
    id: "sea",
    title: "Sea",
    note: "Whole fish, lobster and crab from the day's catch, prepared to share.",
    items: [],
  },
  { id: "sides", title: "Sides", note: "Ask your server for today's sides.", items: [] },
  {
    id: "dessert",
    title: "Dessert",
    note: "Full-sized desserts for the table, from tarts to baked Alaska and creme brulee.",
    items: [],
  },
  {
    id: "drinks",
    title: "Drinks",
    note: "A Canadian-focused wine list built for bold flavour, alongside classic and signature cocktails.",
    items: [],
  },
];

export const TASTING_MENU = {
  title: "The Leo Tasting",
  price: 120,
  description: "Three courses, shared family-style: choose a starter, a main from land or sea, and a dessert.",
};

export const CHEFS = [
  {
    name: "Alvin Leung",
    role: "Chef and Founder",
    image: "/images/chef-alvin.webp",
    bio: "The iconoclastic \"Demon Chef\" behind Hong Kong's two-Michelin-starred Bo Innovation and a familiar face from MasterChef Canada. At The Leo he brings a new perspective to the classic steakhouse: premium ingredients, thoughtful technique, and an approach that doesn't take tradition too literally.",
  },
  {
    name: "Edan Lister-Stevens",
    role: "Executive Chef",
    image: "/images/chef-grill.webp",
    bio: "Brings a modern, technique-driven approach to The Leo. Previously Head Chef at Michelin-starred aKin in Toronto, his cooking blends classical technique with the bold flavours and traditions of East and Southeast Asia.",
  },
  {
    name: "Caleb Eisenberg",
    role: "Chef de Cuisine",
    image: "/images/chef-kitchen.webp",
    bio: "Growing up in Markham, Chef Caleb brings a refined, technique-driven approach to the kitchen. Having previously worked at Michelin-starred Alo in Toronto, he draws on his fine-dining background to bring precision and creativity to every plate.",
  },
];

export const EVENT_TYPES = [
  "Corporate",
  "Birthday",
  "Engagement",
  "Holiday Party",
  "Bridal or Baby Shower",
  "Networking Event",
  "Full Buyout",
  "Other",
];

export const SIGNATURES = [
  { title: "Singapore Chili Crab", caption: "Sweet, hot, meant for hands", image: "/images/chili-crab-tall.webp" },
  { title: "Whole Grilled Fish", caption: "Charred over the flame", image: "/images/grilled-fish.webp" },
  { title: "Hokkaido Scallop Ceviche", caption: "Lemongrass, cucamelon, cilantro", image: "/images/ceviche.webp" },
  { title: "Short Rib for the Table", caption: "Slow-cooked, glazed, shared", image: "/images/short-rib.webp" },
  { title: "The Spread", caption: "Family-style, passed around", image: "/images/table-tall.webp" },
  { title: "Signature Cocktails", caption: "Classics and imaginative originals", image: "/images/cocktail.webp" },
];
