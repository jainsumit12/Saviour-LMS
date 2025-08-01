import { Injectable } from '@nestjs/common';
import { Country, State, City } from 'country-state-city';
@Injectable()
export class CountryStateCityService {
  async findAll(country: string, state: string) {
    if (state && country) {
      const data = City.getCitiesOfState(country, state);

      return {
        message: 'City fetched successfully',
        data: data,
      };
    } else if (country) {
      const data = State.getStatesOfCountry(country);

      return {
        message: 'State fetched successfully',
        data: data,
      };
    } else {
      const data = Country.getAllCountries();

      return {
        message: 'Country fetched successfully',
        data: data,
      };
    }
  }
}
