import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  MAX_YEAR,
  MIN_YEAR,
  VALID_LOCATIONS,
  VALID_MAKES,
  VALID_MODELS,
  VALID_SERVICES,
} from '../../constants/options.constants';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required.' })
  @MaxLength(120)
  fullName: string;

  /**
   * Accepts international and local Bahrain formats, e.g. "+973 3333 4444",
   * "97333334444", "33334444". Allows digits, spaces, dashes, parentheses
   * and a leading +, with 6–20 digits total.
   */
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required.' })
  @Matches(/^\+?[0-9\s\-()]{6,20}$/, {
    message: 'Please provide a valid phone number, e.g. +973 3333 4444.',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Car make is required.' })
  @IsIn(VALID_MAKES, { message: 'Please select a valid car make.' })
  carMake: string;

  @IsString()
  @IsNotEmpty({ message: 'Car model is required.' })
  @IsIn(VALID_MODELS, { message: 'Please select a valid car model.' })
  carModel: string;

  @Type(() => Number)
  @IsInt({ message: 'Please select a valid year.' })
  @Min(MIN_YEAR, { message: `Year must be ${MIN_YEAR} or later.` })
  @Max(MAX_YEAR, { message: `Year must be ${MAX_YEAR} or earlier.` })
  year: number;

  @IsString()
  @IsNotEmpty({ message: 'Location is required.' })
  @IsIn(VALID_LOCATIONS, { message: 'Please select a valid Bahrain location.' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'Service is required.' })
  @IsIn(VALID_SERVICES, { message: 'Please select a valid service.' })
  service: string;
}
