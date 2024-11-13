import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {}

    @Get(':id_user')
    findByIdDriver(@Param('id_user') id_user: number) {
        return this.companiesService.findByIdUser(id_user);
    }

    @Post()
    create(@Body() company: CreateCompanyDto) {
        return this.companiesService.create(company);
    }

}
