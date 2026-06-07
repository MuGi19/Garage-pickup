import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BookingsModule } from './bookings/bookings.module';
import { OptionsModule } from './options/options.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    // Loads .env (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).
    ConfigModule.forRoot({ isGlobal: true }),

    // Provides the shared Supabase client (global).
    SupabaseModule,

    // Serve the static landing page from /public at the site root.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      // Let /api/* routes fall through to controllers instead of 404-ing.
      exclude: ['/api/(.*)'],
    }),

    BookingsModule,
    OptionsModule,
  ],
})
export class AppModule {}
