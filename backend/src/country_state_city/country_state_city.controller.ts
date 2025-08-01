import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CountryStateCityService } from './country_state_city.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('country-state-city')
@Controller('country-state-city')
export class CountryStateCityController {
  constructor(
    private readonly countryStateCityService: CountryStateCityService,
  ) {}

  @Get()
  findAll(@Query('country') country: string, @Query('state') state: string) {
    return this.countryStateCityService.findAll(country, state);
  }
}
