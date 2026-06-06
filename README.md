# Revive Mobile Auto

**Elite Concierge Mechanics — Kingdom of Bahrain.**

A "mobile mechanic" booking platform: customers schedule a master technician to
come to their residence or office suite and service their car on-site. Built as
a [NestJS](https://nestjs.com/) application with a SQLite database and a single
responsive, dark-luxury landing page.

---

## Features

- **Single-page booking experience** — serif/gold "dark luxury" theme, fully
  responsive down to mobile.
- **`bookings` module** — controller + service + DTO + TypeORM entity.
- **SQLite via TypeORM** — zero-config local database, structured so it can swap
  to Postgres later (see [Swapping to Postgres](#swapping-to-postgres)).
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
| Database    | SQLite (`better-sqlite3`) via TypeORM           |
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

# 2. Start in watch mode (auto-reload on changes)
npm run start:dev
```

Then open <http://localhost:3000> in your browser.

A SQLite database file (`revive.db`) is created automatically in the project root
on first run.

### Other scripts

```bash
npm run start        # run once (no watch)
npm run build        # compile to /dist
npm run start:prod   # run the compiled build from /dist
```

The server port can be overridden with the `PORT` env var, and the database file
location with `DATABASE_PATH`.

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
├── app.module.ts                 # TypeORM + static assets + feature modules
├── constants/
│   └── options.constants.ts      # Single source of truth for all dropdowns
├── bookings/
│   ├── booking.entity.ts         # TypeORM entity
│   ├── bookings.controller.ts    # POST /api/bookings, GET /api/bookings
│   ├── bookings.service.ts       # DB access
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

## Swapping to Postgres

The app uses TypeORM, so moving off SQLite is a config change in
`src/app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Booking],
  synchronize: false, // use migrations in production
});
```

Install `pg` (`npm install pg`) and remove `better-sqlite3` if no longer needed.
The entity, repository, service and controller code remain unchanged.
