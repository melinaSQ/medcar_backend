import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './company.entity';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ Company, User ])],
  providers: [CompaniesService],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
