import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.PARTNERS, schema: PartnerSchema },
    ]),
  ],
  providers: [PartnersService],
  controllers: [PartnersController],
  exports: [PartnersService],
})
export class PartnersModule {}
