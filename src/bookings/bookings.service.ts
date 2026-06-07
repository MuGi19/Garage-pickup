import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { Booking, BookingRow } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert({
        full_name: dto.fullName,
        phone: dto.phone,
        car_make: dto.carMake,
        car_model: dto.carModel,
        year: dto.year,
        location: dto.location,
        service: dto.service,
      })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to save booking: ${error.message}`,
      );
    }

    return this.toBooking(data as BookingRow);
  }

  async findAll(): Promise<Booking[]> {
    const { data, error } = await this.supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        `Failed to load bookings: ${error.message}`,
      );
    }

    return (data as BookingRow[]).map((row) => this.toBooking(row));
  }

  /** Map a snake_case Supabase row to the camelCase API shape. */
  private toBooking(row: BookingRow): Booking {
    return {
      id: row.id,
      fullName: row.full_name,
      phone: row.phone,
      carMake: row.car_make,
      carModel: row.car_model,
      year: row.year,
      location: row.location,
      service: row.service,
      createdAt: row.created_at,
    };
  }
}
