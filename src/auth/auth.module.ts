import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesService } from 'src/roles/roles.service';
import { Rol } from 'src/roles/rol.entity';
import { AmbulancesService } from 'src/ambulances/ambulances.service';
import { Ambulance } from 'src/ambulances/ambulance.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Rol, Ambulance]),
    
    JwtModule.register({
      secret: jwtConstants.secret,
      //borrar lo de las llaves si no queremos que la sesion expire
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, RolesService, AmbulancesService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
