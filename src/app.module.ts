import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings/booking.entity';
import { BookingsModule } from './bookings/bookings.module';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    /**
     * Database configuration.
     *
     * Using SQLite via the `sql.js` driver (SQLite compiled to WebAssembly) for
     * zero-config local setup with no native build step. The database is
     * persisted to a file on disk (`autoSave` writes after every change).
     *
     * To migrate to Postgres later, swap `type` to 'postgres' and supply
     * host/port/username/password/database (ideally via environment variables) —
     * the entities, repositories and the rest of the app stay unchanged.
     */
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: process.env.DATABASE_PATH || 'revive.db',
      autoSave: true,
      entities: [Booking],
      // Auto-create the schema in dev. For Postgres in production, prefer
      // migrations over `synchronize: true`.
      synchronize: true,
    }),

    // Serve the static landing page from /public at the site root.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      // Let /api/* routes fall through to the controllers instead of 404-ing
      // as missing static assets.
      exclude: ['/api/(.*)'],
    }),

    BookingsModule,
    OptionsModule,
  ],
})
export class AppModule {}
