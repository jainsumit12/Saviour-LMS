import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignationsService } from './designations.service';
import { DesignationsController } from './designations.controller';
import { Designation, DesignationSchema } from './schemas/designation.schema';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.DESIGNATIONS, schema: DesignationSchema },
    ]),
  ],
  providers: [DesignationsService],
  controllers: [DesignationsController],
})
export class DesignationsModule {}
