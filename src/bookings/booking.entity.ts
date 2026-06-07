/**
 * Booking shape returned by the API (camelCase).
 *
 * Persistence now lives in Supabase Postgres (table `public.bookings`, which
 * uses snake_case columns); the service maps between the two.
 */
export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  carMake: string;
  carModel: string;
  year: number;
  location: string;
  service: string;
  createdAt: string;
}

/** Raw row shape as stored in / returned from Supabase (snake_case). */
export interface BookingRow {
  id: string;
  full_name: string;
  phone: string;
  car_make: string;
  car_model: string;
  year: number;
  location: string;
  service: string;
  created_at: string;
}
