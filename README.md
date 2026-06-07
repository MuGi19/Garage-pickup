# Revive Mobile Auto

**Elite Concierge Mechanics — Kingdom of Bahrain.**

A "mobile mechanic" booking platform: customers schedule a master technician to
come to their residence or office suite and service their car on-site. Built as
a [NestJS](https://nestjs.com/) application backed by
[Supabase](https://supabase.com/) (Postgres) with a single responsive,
dark-luxury landing page.

---

## Features

- **Single-page booking experience** — serif/gold "dark luxury" theme, fully
  responsive down to mobile.
- **`bookings` module** — controller + service + DTO.
- **Supabase (Postgres)** — bookings persist to a cloud Postgres table via
  `@supabase/supabase-js`. No authentication: submissions are open to everyone
  (governed by permissive Row Level Security policies).
- **Validation** — [class-validator](https://github.com/typestack/class-validator)
  on the DTO: required fields, valid phone format, and enum/whitelist checks for
  car make, model, year, location and service.
- **Single source of truth** — every dropdown list (cars, years, locations,
  services) lives in one shared constants file consumed by both validation and
  the `GET /api/options` endpoint.

---

## Tech stack

| Layer       | Choice                                          |
| ----------- | ----------------------------------------------- |
| Backend     | NestJS (TypeScript)                             |
| Database    | Supabase / Postgres via `@supabase/supabase-js` |
| Frontend    | Static `index.html` (vanilla HTML/CSS/JS) served via `ServeStaticModule` |
| Validation  | class-validator / class-transformer             |

---

## Prerequisites

- **Node.js 18+** and npm (Node 20 LTS recommended).
  Verify with `node --version` and `npm --version`.

> ⚠️ Node.js was **not detected** on this machine when the project was generated.
> Install it from <https://nodejs.org/> (LTS) before running the commands below.

---

## Setup & run

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file in the project root (see below)

# 3. Start in watch mode (auto-reload on changes)
npm run start:dev
```

Then open <http://localhost:3000> in your browser.

### Environment variables

Create a `.env` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxx
```

> `.env` is git-ignored. The publishable key is safe to expose in clients; do
> **not** put a `service_role` key here.

The booking data lives in a `public.bookings` table in your Supabase project
(see [Database schema](#database-schema)). The server port can be overridden with
the `PORT` env var.

### Other scripts

```bash
npm run start        # run once (no watch)
npm run build        # compile to /dist
npm run start:prod   # run the compiled build from /dist
```

---

## API

### `POST /api/bookings`

Create a booking. Body:

```json
{
  "fullName": "John Doe",
  "phone": "+973 3333 4444",
  "carMake": "Toyota",
  "carModel": "Land Cruiser",
  "year": 2024,
  "location": "Seef",
  "service": "Oil & Filter Change"
}
```

Success response:

```json
{ "success": true, "bookingId": "f3c0...-uuid" }
```

Invalid input returns `400` with a `message` array describing each problem.

### `GET /api/bookings`

Returns all bookings (newest first) as JSON — a simple admin list.

### `GET /api/options`

Returns every dropdown dataset (`cars`, `years`, `locations`, `services`) so the
frontend renders its selects from a single source of truth.

---

## Project structure

```
src/
├── main.ts                       # Bootstrap + global ValidationPipe
├── app.module.ts                 # ConfigModule + Supabase + static assets + features
├── constants/
│   └── options.constants.ts      # Single source of truth for all dropdowns
├── supabase/
│   └── supabase.module.ts        # Global provider for the shared Supabase client
├── bookings/
│   ├── booking.entity.ts         # Booking / BookingRow TypeScript types
│   ├── bookings.controller.ts    # POST /api/bookings, GET /api/bookings
│   ├── bookings.service.ts       # Supabase data access (insert / select)
│   ├── bookings.module.ts
│   └── dto/
│       └── create-booking.dto.ts # class-validator rules
└── options/
    ├── options.controller.ts     # GET /api/options
    └── options.module.ts
public/
└── index.html                    # The landing page (served at /)
```

---

## Database schema

Bookings are stored in a `public.bookings` table in Supabase (Postgres). The
table uses snake_case columns; `BookingsService` maps them to the camelCase API
shape. Schema:

```sql
create table public.bookings (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  phone       text not null,
  car_make    text not null,
  car_model   text not null,
  year        integer not null,
  location    text not null,
  service     text not null,
  created_at  timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- No auth: anyone may submit a booking.
create policy "Public can insert bookings" on public.bookings
  for insert to anon, authenticated with check (true);

-- Open read for the simple admin list (exposes PII — lock down before prod).
create policy "Public can read bookings" on public.bookings
  for select to anon, authenticated using (true);

grant select, insert on public.bookings to anon, authenticated;
```

> ⚠️ **Security note:** with no authentication, the open `SELECT` policy lets
> anyone with the publishable key read every booking (including names and phone
> numbers). Before production, add authentication and restrict reads (e.g. to an
> admin role / `service_role` on the server), or drop the public `SELECT` policy.
