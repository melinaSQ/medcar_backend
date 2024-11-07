import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { SocketModule } from './socket/socket.module';
import { DriversPositionModule } from './drivers_position/drivers_position.module';
import { ClientRequestsModule } from './client_requests/client_requests.module';
// import { TimeAndDistanceValuesModule } from './time_and_distance_values/time_and_distance_values.module';
// import { DriverTripOffersModule } from './driver_trip_offers/driver_trip_offers.module';
// import { DriverCarInfoModule } from './driver_car_info/driver_car_info.module';
// import { ConfigModule } from '@nestjs/config';
// import { FirebaseModule } from './firebase/firebase.module';
// import { AuthModule } from './auth/auth.module';
import { TimeAndDistanceValuesModule } from './time_and_distance_values/time_and_distance_values.module';
import { DriverTripOffersModule } from './driver_trip_offers/driver_trip_offers.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'adme5416',
      database: 'medcarDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    SocketModule,
    DriversPositionModule,
    ClientRequestsModule,
    TimeAndDistanceValuesModule,
    DriverTripOffersModule,
    /*
    ConfigModule.forRoot({ cache: true }),
    TimeAndDistanceValuesModule,
    DriverTripOffersModule,
    DriverCarInfoModule,
    FirebaseModule,
    */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}