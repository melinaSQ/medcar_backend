import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
@Injectable()
export class CompaniesService {

    constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

    async create(company: CreateCompanyDto) {
        const companyInfoFound = await this.companyRepository.findOneBy({id_user: company.id_user});
        if (!companyInfoFound) {
            const newCompanyInfo = this.companyRepository.create(company);
            return this.companyRepository.save(newCompanyInfo);
        }
        const updatedCompanyInfo = Object.assign(companyInfoFound, company);
        return this.companyRepository.save(updatedCompanyInfo);
    }

    // findByIdDriver(id_driver: number) {
    //     return this.driverCarInfoRepository.findOneBy({ id_driver: id_driver });
    // }

}
