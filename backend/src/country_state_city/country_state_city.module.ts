import { Module } from '@nestjs/common';
import { CountryStateCityService } from './country_state_city.service';
import { CountryStateCityController } from './country_state_city.controller';

@Module({
  controllers: [CountryStateCityController],
  providers: [CountryStateCityService],
})
export class CountryStateCityModule {}
