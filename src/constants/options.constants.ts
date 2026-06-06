/**
 * Single source of truth for every dropdown option used by Revive Mobile Auto.
 *
 * These structures are consumed by:
 *   - the validation layer (CreateBookingDto) — via the derived flat arrays below,
 *   - the GET /api/options endpoint — which serves the grouped structures to the
 *     frontend so the selects render from exactly one source of truth.
 */

export interface OptionGroup<T = string> {
  /** Group label rendered as an <optgroup> in the frontend. */
  group: string;
  /** Options belonging to the group. */
  options: T[];
}

/* ------------------------------------------------------------------ */
/* Cars — grouped by make                                              */
/* ------------------------------------------------------------------ */

export interface CarMakeGroup {
  make: string;
  models: string[];
}

export const CAR_MAKES: CarMakeGroup[] = [
  {
    make: 'Toyota',
    models: [
      'Camry',
      'Corolla',
      'RAV4',
      'Land Cruiser',
      'Hilux',
      'Avalon',
      'Prius',
      'Yaris',
      'Supra',
    ],
  },
  {
    make: 'Honda',
    models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Fit'],
  },
  {
    make: 'Ford',
    models: ['F-150', 'Explorer', 'Mustang', 'Edge', 'Escape', 'Ranger'],
  },
  {
    make: 'Nissan',
    models: [
      'Altima',
      'Maxima',
      'Sentra',
      'Patrol',
      'X-Trail',
      'Pathfinder',
      'Sunny',
      'Kicks',
      'Navara',
    ],
  },
  {
    make: 'BMW',
    models: [
      '3 Series',
      '5 Series',
      '7 Series',
      'X1',
      'X3',
      'X5',
      'X7',
      'M3',
      'M5',
    ],
  },
  {
    make: 'Mercedes-Benz',
    models: [
      'A-Class',
      'C-Class',
      'E-Class',
      'S-Class',
      'GLA',
      'GLC',
      'GLE',
      'GLS',
      'G-Class',
    ],
  },
  {
    make: 'Hyundai',
    models: [
      'Elantra',
      'Sonata',
      'Accent',
      'Tucson',
      'Santa Fe',
      'Creta',
      'Palisade',
    ],
  },
  {
    make: 'Kia',
    models: ['Optima', 'Cerato', 'Rio', 'Sportage', 'Sorento', 'Seltos', 'Carnival'],
  },
  {
    make: 'Lexus',
    models: ['IS', 'ES', 'LS', 'NX', 'RX', 'GX', 'LX', 'LC'],
  },
  {
    make: 'Chevrolet',
    models: [
      'Malibu',
      'Impala',
      'Camaro',
      'Tahoe',
      'Suburban',
      'Silverado',
      'Captiva',
      'Traverse',
    ],
  },
  {
    make: 'Mitsubishi',
    models: ['Lancer', 'Pajero', 'Montero Sport', 'Outlander', 'ASX', 'L200'],
  },
  {
    make: 'Mazda',
    models: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5'],
  },
  {
    make: 'Volkswagen',
    models: ['Golf', 'Passat', 'Jetta', 'Tiguan', 'Touareg', 'Teramont'],
  },
  {
    make: 'Audi',
    models: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'],
  },
  {
    make: 'GMC',
    models: ['Sierra', 'Yukon', 'Acadia', 'Terrain'],
  },
  {
    make: 'Jeep',
    models: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass'],
  },
];

/* ------------------------------------------------------------------ */
/* Years — current year down to 1990                                   */
/* ------------------------------------------------------------------ */

const CURRENT_YEAR = 2026;
const EARLIEST_YEAR = 1990;

export const YEARS: number[] = Array.from(
  { length: CURRENT_YEAR - EARLIEST_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i,
);

/* ------------------------------------------------------------------ */
/* Locations — grouped by governorate (Bahrain)                        */
/* ------------------------------------------------------------------ */

export const LOCATIONS: OptionGroup[] = [
  {
    group: 'Capital Governorate',
    options: [
      'Manama',
      'Tubli',
      'Juffair',
      'Seef',
      'Adliya',
      'Hoora',
      'Sitra',
      'Gudaibiya',
      'Karbabad',
      'Al Bilad Al Qadeem',
      'Umm Al Hassam',
    ],
  },
  {
    group: 'Central Areas / Southern Governorate',
    options: [
      'Isa Town',
      'Riffa (East)',
      'Riffa (West)',
      'Sanad',
      "A'ali",
      'Hamad Town',
      'Zallaq',
    ],
  },
  {
    group: 'Muharraq Governorate',
    options: [
      'Muharraq',
      'Arad',
      'Hidd',
      'Galali',
      'Busaiteen',
      'Amwaj Islands',
    ],
  },
  {
    group: 'Northern Governorate',
    options: [
      'Hamad Town',
      'Saar',
      'Budaiya',
      'Janabiyah',
      'Diraz',
      'Bani Jamra',
      'Hamala',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Services / Spare parts — grouped by category                        */
/* ------------------------------------------------------------------ */

export const SERVICES: OptionGroup[] = [
  {
    group: 'Routine Maintenance',
    options: [
      'Oil & Filter Change',
      'Engine Air Filter Replacement',
      'Cabin AC Filter Renewal',
      'Wiper Blades Replacement',
      'Fluid Top-Up & Level Check',
    ],
  },
  {
    group: 'Brakes & Suspension',
    options: [
      'Brake Pads Replacement',
      'Brake Rotors / Discs Renewal',
      'Brake Fluid Flush',
      'Shock Absorbers & Struts Service',
      'Control Arm / Ball Joint Replacement',
    ],
  },
  {
    group: 'Engine & Ignition',
    options: [
      'Spark Plugs Renewal',
      'Ignition Coil Replacement',
      'Serpentine Belt Replacement',
      'Engine Thermostat Replacement',
      'Radiator Hose Repair',
    ],
  },
  {
    group: 'Electrical & Charging System',
    options: [
      'Battery Replacement',
      'Alternator Replacement',
      'Starter Motor Replacement',
      'Fuses & Wiring Diagnostics',
    ],
  },
  {
    group: 'Emergency Assistance',
    options: [
      'Flat Tire Change (Install Spare)',
      'Battery Jump Start Assist',
      'Fuel Delivery (Out of Gas)',
    ],
  },
  {
    group: 'Diagnostics & Overrides',
    options: [
      'Computer OBD2 Error Code Scanning',
      'Check Engine Light Inspection',
      'Other / Custom Repair Diagnostic',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Derived flat arrays — used for validation (class-validator @IsIn)   */
/* ------------------------------------------------------------------ */

export const VALID_MAKES: string[] = CAR_MAKES.map((m) => m.make);

export const VALID_MODELS: string[] = CAR_MAKES.flatMap((m) => m.models);

export const VALID_LOCATIONS: string[] = LOCATIONS.flatMap((g) => g.options);

export const VALID_SERVICES: string[] = SERVICES.flatMap((g) => g.options);

export const VALID_YEARS: number[] = YEARS;

export const MIN_YEAR = EARLIEST_YEAR;
export const MAX_YEAR = CURRENT_YEAR;

/**
 * Convenience aggregate returned by GET /api/options so the frontend can
 * build every <select> from one payload.
 */
export const ALL_OPTIONS = {
  cars: CAR_MAKES,
  years: YEARS,
  locations: LOCATIONS,
  services: SERVICES,
};
