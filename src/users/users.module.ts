import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { Rol } from 'src/roles/rol.entity';
import { Ambulance } from 'src/ambulances/ambulance.entity';
import { Company } from 'src/companies/company.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Rol, Ambulance, Company]) ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}
