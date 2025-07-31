import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutesService } from './institutes.service';
import { InstitutesController } from './institutes.controller';
import { Institute, InstituteSchema } from './schemas/institute.schema';
import { ModelNames } from 'src/helper/model_names';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.INSTITUTES, schema: InstituteSchema },
    ]),
    MailerModule,
  ],
  providers: [InstitutesService],
  controllers: [InstitutesController],
  exports: [InstitutesService],
})
export class InstitutesModule {}
