import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserCompanyInfo } from './user_company_info.entity';
import { UserCompanyInfoService } from './user_company_info.service';
import { UserCompanyInfoController } from './user_company_info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ UserCompanyInfo, User ])],
  providers: [UserCompanyInfoService],
  controllers: [UserCompanyInfoController]
})
export class UserCompanyInfoModule {}