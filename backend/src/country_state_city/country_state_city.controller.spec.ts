import { Test, TestingModule } from '@nestjs/testing';
import { CountryStateCityController } from './country_state_city.controller';
import { CountryStateCityService } from './country_state_city.service';

describe('CountryStateCityController', () => {
  let controller: CountryStateCityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryStateCityController],
      providers: [CountryStateCityService],
    }).compile();

    controller = module.get<CountryStateCityController>(CountryStateCityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
