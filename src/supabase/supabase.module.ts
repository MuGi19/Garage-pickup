import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/** Injection token for the shared Supabase client. */
export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

/**
 * Provides a single, app-wide Supabase client built from the env vars.
 *
 * The publishable key is used (no auth / no service-role key), so all access
 * is governed by the table's Row Level Security policies. Marked @Global so
 * any module can inject SUPABASE_CLIENT without re-importing this module.
 */
@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient => {
        const url = config.get<string>('NEXT_PUBLIC_SUPABASE_URL');
        const key = config.get<string>('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');

        if (!url || !key) {
          throw new Error(
            'Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and ' +
              'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your .env file.',
          );
        }

        return createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
      },
    },
  ],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
