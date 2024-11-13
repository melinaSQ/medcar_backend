import { Module } from '@nestjs/common';
import { AmbulancesService } from './ambulances.service';
import { AmbulancesController } from './ambulances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambulance } from './ambulance.entity';
import { User } from 'src/users/user.entity';
import { Company } from 'src/companies/company.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Ambulance, User, Company]) ],
  providers: [AmbulancesService],
  controllers: [AmbulancesController]
})
export class AmbulancesModule {}
