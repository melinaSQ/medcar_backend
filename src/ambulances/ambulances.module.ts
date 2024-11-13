import { Module } from '@nestjs/common';
import { AmbulancesService } from './ambulances.service';
import { AmbulancesController } from './ambulances.controller';

@Module({
  providers: [AmbulancesService],
  controllers: [AmbulancesController]
})
export class AmbulancesModule {}
