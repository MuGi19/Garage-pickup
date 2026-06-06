import { Controller, Get } from '@nestjs/common';
import { ALL_OPTIONS } from '../constants/options.constants';

/**
 * Serves every dropdown dataset (cars, years, locations, services) from the
 * single shared constants file so the frontend renders its <select> elements
 * from one source of truth.
 */
@Controller('api/options')
export class OptionsController {
  @Get()
  getOptions() {
    return ALL_OPTIONS;
  }
}
