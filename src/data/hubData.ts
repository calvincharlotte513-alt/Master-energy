import { Department, LeasedBusiness, FuelProduct, KitchenDish, LoungePackage, WashService, GardenFeature } from '../types/hub';

export const DEPARTMENTS: Record<string, Department> = {
  'oil-gas': {
    id: 'oil-gas',
    name: 'Master Energy Oil & Gas',
    headline: 'Correct Pump Meter & Clean Fuel, 24 Hours Daily',
    subtitle: 'Fuel (Petrol), Diesel, Kerosene & Safe Cooking Gas',
    hours: 'Open 24 Hours / 7 Days a Week',
    phone: '0803 456 7890',
    image: '/src/assets/images/hero_mega_station_1792957563926.jpg',
    badge: 'Fuel Station',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/20',
    description: 'We sell clean fuel with correct pump gauge along Aba-Owerri Road in Naze. With 16 fast digital pumps, standby power, and zero water in fuel, you get the exact liters you pay for every single time.',
    storytelling: 'Many drivers on the Owerri-Aba road worry about bad fuel and cheated meters. At Master Energy Naze, our pumps are strictly calibrated. What the meter shows is what enters your tank, whether you are filling a small generator keg, a private car, or a commercial truck.',
    highlights: [
      'Correct meter reading — 10 liters is 10 liters, no cheating',
      'High-speed diesel pumps for interstate buses and heavy trucks',
      'Clean cooking gas (LPG) refill on digital scales with accurate weight',
      'Clean underground tanks checked daily to protect car injectors',
      '24/7 solar and standby power — no light out'
    ],
    keyStats: [
      { label: 'Pumps Available', value: '16 Nozzles' },
      { label: 'Pump Accuracy', value: '100% Correct' },
      { label: 'Cooking Gas Tank', value: '25 Tonnes' },
      { label: 'Working Hours', value: '24/7 Day & Night' }
    ],
    threeDCoordinates: [0, 0.5, 4]
  },
  'kitchen': {
    id: 'kitchen',
    name: 'Masters Kitchen',
    headline: 'Hot Nigerian Food, Fresh Grills & Fast Takeaway',
    subtitle: 'Firewood Party Jollof, Fresh Grilled Fish, Ofe Owerri & Isi Ewu',
    hours: '6:00 AM – 11:30 PM Daily',
    phone: '0803 456 7891',
    image: '/src/assets/images/masters_kitchen_1792957563859.jpg',
    badge: 'Restaurant',
    accentColor: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/20',
    description: 'Masters Kitchen serves sweet homemade Nigerian food in an air-conditioned dining hall. Stop by for piping hot Ofe Owerri, spicy Isi Ewu, smokey party jollof, or order a neat takeaway box for your journey.',
    storytelling: 'Whether you are an interstate traveler passing through Naze, a local resident having lunch, or a family stopping by for dinner, our food is cooked fresh daily with authentic local market spices.',
    highlights: [
      'Authentic Ofe Owerri, Bitterleaf Soup, Egusi & Fisherman Soup with swallow',
      'Fresh live catfish and croaker point-and-kill grilled with hot pepper sauce',
      'Smokey firewood party jollof rice and fried rice with dodo',
      'Clean takeaway packaging for travelers on the go',
      'Spicy Isi Ewu and tender goat meat Nkwobi'
    ],
    keyStats: [
      { label: 'Food Varieties', value: '35+ Dishes' },
      { label: 'Serving Speed', value: 'Fast Service' },
      { label: 'Hall Seating', value: '120 Seats' },
      { label: 'Kitchen Standard', value: '100% Clean' }
    ],
    threeDCoordinates: [-7, 1.2, 0]
  },
  'lounge': {
    id: 'lounge',
    name: 'Masters Lounge',
    headline: 'Cool Executive VIP Lounge for Chilling & Nightlife',
    subtitle: 'Chilled Drinks, Private Velvet Booths & Good Music',
    hours: '4:00 PM – 4:00 AM Daily',
    phone: '0803 456 7892',
    image: '/src/assets/images/masters_lounge_1792957565345.jpg',
    badge: 'VIP Lounge',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/20',
    description: 'Masters Lounge is our premium upstairs lounge in Naze. It features cozy velvet booth seats, cold champagne, original cognacs, quiet private rooms for business talks, and top DJs on weekends.',
    storytelling: 'Built for those who appreciate good class and peace of mind in Imo State. You can hold private discussions, celebrate with friends, or just relax with an ice-cold drink in a cool air-conditioned space.',
    highlights: [
      'Original cognac, whiskey, scotch, and chilled champagne',
      'Private VIP booths with dedicated waiter service',
      'Tasty small chops, peppered snails, and chicken wings',
      'Good sound system set at comfortable conversation volume',
      'Tight security and private parking'
    ],
    keyStats: [
      { label: 'Private Booths', value: '8 VIP Pods' },
      { label: 'Drinks Selection', value: 'Original Labels' },
      { label: 'Cocktails', value: 'Freshly Mixed' },
      { label: 'Vibe', value: 'Cool & Classy' }
    ],
    threeDCoordinates: [-4, 2, -7]
  },
  'carwash': {
    id: 'carwash',
    name: 'Masters Car Wash',
    headline: 'Snow Foam Wash & Full Detailing While You Relax',
    subtitle: 'Underbody Pressure Wash, Interior Vacuum & Engine Wash',
    hours: '7:00 AM – 9:00 PM Daily',
    phone: '0803 456 7893',
    image: '/src/assets/images/masters_carwash_1792957566167.jpg',
    badge: 'Car Wash',
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/20',
    description: 'Let our trained wash team clean off red dust and highway mud from your car. We use thick snow foam shampoo, high-pressure chassis jets, and full vacuuming so your car drives out clean and sparkling.',
    storytelling: 'Highway driving in the East brings red mud and dust. Instead of waiting in the sun, relax inside our air-conditioned waiting room with TV and free Wi-Fi while our boys clean your car inside out.',
    highlights: [
      'Thick snow foam wash that protects your car paint',
      'High-pressure underbody blaster to remove mud and red dirt',
      'Full interior vacuum, seat wiping, and sweet-smelling air freshener',
      'Engine dry-steam wash that is safe for electrical wiring',
      'Air-conditioned customer waiting room with TV and cold water'
    ],
    keyStats: [
      { label: 'Washing Bays', value: '6 Cars at Once' },
      { label: 'Express Wash', value: '15 Mins' },
      { label: 'Water Quality', value: 'Clean Borehole' },
      { label: 'Staff', value: 'Careful & Trained' }
    ],
    threeDCoordinates: [8, 1, -2]
  },
  'garden': {
    id: 'garden',
    name: 'Masters Bar & Garden',
    headline: 'Open-Air Garden, Hot Suya & Live Football Matches',
    subtitle: 'Chilled Beer, Fresh Point-and-Kill Fish & Evening Breeze',
    hours: '12:00 PM – 2:00 AM Daily',
    phone: '0803 456 7894',
    image: '/src/assets/images/masters_bar_garden_1792957565781.jpg',
    badge: 'Garden Bar',
    accentColor: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/20',
    description: 'An open-air relaxation spot under green palm trees. Enjoy ice-cold drinks, hot ram suya, spicy asun, and watch Premier League & Champions League football matches on big screens.',
    storytelling: 'As evening sets in, the garden lights come on and the cool Naze breeze blows. It is the best place to chill with friends after work, eat fresh roasted fish, and enjoy weekend live highlife music.',
    highlights: [
      'Hot charcoal grilled beef suya and spicy goat meat asun',
      'Live catfish point-and-kill prepared right in front of you',
      'Ice-cold Nigerian and foreign beers served in chilled glasses',
      'Big screens for live Premier League, Champions League & AFCON games',
      'Live music and acoustic highlife bands on weekends'
    ],
    keyStats: [
      { label: 'Garden Capacity', value: '250 Guests' },
      { label: 'Big Screens', value: '4 HD Screens' },
      { label: 'Grill', value: 'Suya, Asun & Fish' },
      { label: 'Atmosphere', value: 'Cool Breeze' }
    ],
    threeDCoordinates: [5, 0.8, 5]
  }
};

export const LEASED_BUSINESSES: LeasedBusiness[] = [
  {
    id: 'zena-foodies',
    name: 'Zena Foodies',
    category: 'Fresh Pastries, Waffles & Smoothies',
    tagline: 'Meat Pies, Belgian Waffles & Cold Fruit Smoothies',
    description: 'Zena Foodies is an independent shop located in the Master Energy commercial space in Naze. They bake fresh hot meat pies, chicken pies, sweet waffles, and blend cold tropical fruit smoothies daily.',
    hours: '7:30 AM – 9:30 PM Daily',
    unitNumber: 'Shop C-1, Commercial Section',
    phone: '0812 345 6789',
    specialties: ['Meat Pies', 'Chicken Pies', 'Waffles', 'Fruit Smoothies'],
    offerings: [
      { name: 'Hot Beef & Chicken Pies', price: '₦1,800', description: 'Crispy pastry loaded with seasoned minced meat' },
      { name: 'Warm Belgian Waffles with Cream', price: '₦4,500', description: 'Fluffy sweet waffles topped with sweet cream' },
      { name: 'Fruit Parfait with Granola', price: '₦3,500', description: 'Sweet yogurt layered with fresh fruit and granola' },
      { name: 'Chilled Mango & Banana Smoothie', price: '₦2,500', description: '100% freshly blended fruits, cold and refreshing' }
    ],
    accentColor: 'text-amber-300',
    leaseBadge: 'Leased Shop'
  },
  {
    id: 'presh-arabian-tea',
    name: 'Presh Arabian Premium Tea',
    category: 'Authentic Arabian Teas & Karak Chai',
    tagline: 'Hot Karak Tea, Saffron Tea & Sweet Arabian Dates',
    description: 'Presh Arabian Tea is an exclusive tea spot located inside the Master Energy station. Taste authentic Arabian hot Karak tea brewed with cardamom, pink Kashmiri tea, and fresh mint tea paired with sweet Saudi dates.',
    hours: '9:00 AM – 11:00 PM Daily',
    unitNumber: 'Kiosk B-2, Commercial Section',
    phone: '0814 987 6543',
    specialties: ['Hot Karak Chai', 'Pink Saffron Tea', 'Moroccan Mint Tea', 'Saudi Dates'],
    offerings: [
      { name: 'Original Hot Karak Chai', price: '₦2,800', description: 'Strong black tea slow-brewed with rich milk and cardamom' },
      { name: 'Kashmiri Pink Saffron Tea', price: '₦3,500', description: 'Traditional pink herbal tea with saffron and crushed nuts' },
      { name: 'Fresh Moroccan Mint Tea', price: '₦3,200', description: 'Hot green tea steeped with fresh spearmint leaves' },
      { name: 'Arabian Dates & Sweet Pastry', price: '₦4,200', description: 'Sweet Medjool dates served with pistachio pastry' }
    ],
    accentColor: 'text-emerald-300',
    leaseBadge: 'Leased Shop'
  }
];

export const FUEL_PRODUCTS: FuelProduct[] = [
  {
    id: 'pms',
    name: 'Petrol (PMS)',
    shortCode: 'PMS / Petrol',
    pricePerUnit: 1050,
    unit: 'Litre',
    available: true,
    dispensersCount: 8,
    description: 'Clean petrol tested for zero water. Protects your car engine and fuel injectors.'
  },
  {
    id: 'ago',
    name: 'Diesel (AGO)',
    shortCode: 'AGO / Diesel',
    pricePerUnit: 1180,
    unit: 'Litre',
    available: true,
    dispensersCount: 4,
    description: 'High-grade diesel for generators, interstate commercial buses, and logistics trucks.'
  },
  {
    id: 'dpk',
    name: 'Kerosene (DPK)',
    shortCode: 'DPK / Kerosene',
    pricePerUnit: 980,
    unit: 'Litre',
    available: true,
    dispensersCount: 2,
    description: 'Pure, clean-burning kerosene for household stoves and industrial use.'
  },
  {
    id: 'lpg',
    name: 'Cooking Gas (LPG)',
    shortCode: 'LPG / Gas',
    pricePerUnit: 1250,
    unit: 'Kg',
    available: true,
    dispensersCount: 2,
    description: 'Safe cooking gas refilled on calibrated digital scales. Blue flame, long lasting.'
  }
];

export const KITCHEN_MENU: KitchenDish[] = [
  {
    id: 'k1',
    name: 'Traditional Ofe Owerri with Pounded Yam',
    category: 'Local Delicacies',
    price: 6500,
    description: 'Authentic Imo soup made with dried fish, stockfish, snails, goat meat, and fresh uziza leaves.',
    badge: 'Local Special',
    prepTime: '15 min'
  },
  {
    id: 'k2',
    name: 'Firewood Party Jollof & Big Grilled Croaker',
    category: 'Rice & Continental',
    price: 5800,
    description: 'Smokey firewood jollof rice served with hot grilled croaker fish, fried plantain (dodo), and salad.',
    badge: 'Popular',
    prepTime: '10 min'
  },
  {
    id: 'k3',
    name: 'Spicy Isi Ewu (Tender Goat Head Bowl)',
    category: 'Local Delicacies',
    price: 7000,
    description: 'Tender goat head prepared in rich traditional potash and utazi sauce, served in a clay bowl.',
    badge: 'Hot Delicacy',
    prepTime: '12 min'
  },
  {
    id: 'k4',
    name: 'Fresh Grilled Catfish with Roasted Plantain (Boli)',
    category: 'Grills & Barbecue',
    price: 6200,
    description: 'Live point-and-kill catfish seasoned with pepper sauce and served with roasted ripe plantains.',
    badge: 'Point & Kill',
    prepTime: '20 min'
  },
  {
    id: 'k5',
    name: 'Rich Fisherman Seafood Soup',
    category: 'Local Delicacies',
    price: 7500,
    description: 'Loaded with river prawns, periwinkles, fresh fish chunks, and crabs. Comes with your choice of swallow.',
    badge: 'Seafood',
    prepTime: '18 min'
  },
  {
    id: 'k6',
    name: 'Big Double-Beef Sharwama',
    category: 'Quick Bites',
    price: 3200,
    description: 'Shredded beef, sausages, fresh cabbage, carrots, and sweet creamy dressing in a toasted wrap.',
    badge: 'Quick Grab',
    prepTime: '8 min'
  }
];

export const LOUNGE_PACKAGES: LoungePackage[] = [
  {
    id: 'l1',
    name: 'Executive Velvet Booth',
    category: 'VIP Booth',
    minSpend: 150000,
    capacity: 'Up to 6 People',
    description: 'Comfortable velvet booth in front of the illuminated bar. Comes with dedicated waiter and ice bucket.',
    perks: ['Welcome drink', 'Personal waiter', 'Reserved parking slot', 'Plate of hot finger foods']
  },
  {
    id: 'l2',
    name: 'Private Soundproof Room',
    category: 'Corporate Lounge',
    minSpend: 350000,
    capacity: 'Up to 14 People',
    description: 'Completely private VIP room with private rest room, TV screen, and independent bar setup for private meetings.',
    perks: ['Private security attendant', 'Custom drink orders', 'Food delivered directly from Kitchen', 'Private outdoor balcony']
  },
  {
    id: 'l3',
    name: 'High Roller VIP Table',
    category: 'Executive Table',
    minSpend: 220000,
    capacity: 'Up to 8 People',
    description: 'Elevated VIP table close to the DJ booth with full view of the lounge.',
    perks: ['Choice of premium cognac or champagne', 'Fresh fruit platter', 'Sparkler presentation', 'Reserved priority parking']
  }
];

export const WASH_SERVICES: WashService[] = [
  {
    id: 'w1',
    name: 'Express Foam Wash & Wipe',
    priceSedan: 2500,
    priceSuv: 3500,
    durationMin: 15,
    description: 'Quick exterior snow foam wash, wheel rim spray, spot-free rinse, and hand dry with microfiber cloth.',
    features: ['High-pressure water rinse', 'Active snow foam shampoo', 'Tire shine polish', 'Clean window wiping']
  },
  {
    id: 'w2',
    name: 'Complete Wash, Underbody & Vacuum',
    priceSedan: 5000,
    priceSuv: 7000,
    durationMin: 30,
    isPopular: true,
    description: 'Full body wash plus underbody mud blaster, complete interior vacuum, and dashboard polish.',
    features: ['Underbody chassis mud blaster', 'Complete interior vacuuming', 'Dashboard shine & UV protection', 'Sweet-smelling air freshener', 'Wheel arch mud scrub']
  },
  {
    id: 'w3',
    name: 'Full Detailing, Ceramic Wax & Steam Clean',
    priceSedan: 12000,
    priceSuv: 16000,
    durationMin: 60,
    description: 'Complete car makeover. Machine ceramic spray wax, steam cleaning to kill germs, and engine wash.',
    features: ['Ceramic spray paint protectant', 'Deep steam interior sanitizing', 'Leather seat conditioning', 'Safe dry-steam engine wash', 'Headlight cleaning']
  }
];

export const GARDEN_FEATURES: GardenFeature[] = [
  {
    id: 'g1',
    title: 'Hot Charcoal Suya & Asun',
    description: 'Fresh beef suya and spicy goat meat asun sliced straight from the hot grill with onions and pepper.',
    schedule: 'From 4:00 PM Daily',
    iconName: 'Flame'
  },
  {
    id: 'g2',
    title: 'Live Football Matches on Big Screens',
    description: 'Watch Premier League, Champions League, and African football matches with cold drinks and good company.',
    schedule: 'Every Matchday & Weekends',
    iconName: 'Tv'
  },
  {
    id: 'g3',
    title: 'Live Highlife & Afrobeats Music',
    description: 'Live saxophone, guitarists, and highlife bands playing sweet Igbo and Nigerian tunes on weekends.',
    schedule: 'Fridays, Saturdays & Sundays from 7:00 PM',
    iconName: 'Music'
  },
  {
    id: 'g4',
    title: 'Open-Air Wooden Cabanas',
    description: 'Comfortable covered cabana huts under palm trees, perfect for chilling with friends and family.',
    schedule: 'Available all day',
    iconName: 'Compass'
  }
];

export const NAZE_HUB_INFO = {
  address: 'KM 3, Aba-Owerri Expressway, Naze Junction, Owerri, Imo State',
  landmark: 'Near Naze Industrial Cluster, 8 Minutes from Owerri City Center',
  coordinates: '5°27\'48.2"N 7°03\'12.5"E',
  hours: 'Fuel Station: 24/7 | Restaurant & Lounge: 6:00 AM – Late',
  contactCenter: '0803 456 7890',
  emergencyDesk: '0803 456 7899',
  transitNotes: [
    '5 minutes from Nekede Roundabout',
    '8 minutes from Douglas Road / Owerri City Center',
    '15 minutes from Imo Airport (Sam Mbakwe Airport)',
    'Direct highway stop for anyone traveling between Owerri, Aba, and Port Harcourt'
  ]
};
