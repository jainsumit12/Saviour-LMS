import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutesService } from './institutes.service';
import { InstitutesController } from './institutes.controller';
import { Institute, InstituteSchema } from './schemas/institute.schema';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.INSTITUTES, schema: InstituteSchema },
    ]),
  ],
  providers: [InstitutesService],
  controllers: [InstitutesController],
  exports: [InstitutesService],
})
export class InstitutesModule {}
