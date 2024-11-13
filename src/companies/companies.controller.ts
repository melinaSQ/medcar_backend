import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {}

    // @Get(':id_driver')
    // findByIdDriver(@Param('id_driver') id_driver: number) {
    //     return this.driverCarInfoService.findByIdDriver(id_driver);
    // }

    @Post()
    create(@Body() company: CreateCompanyDto) {
        return this.companiesService.create(company);
    }

}
