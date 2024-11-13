import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AmbulancesService } from './ambulances.service';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';

@Controller('ambulances')
export class AmbulancesController {
    constructor(private ambulancesService: AmbulancesService) {}

    // @Get(':id_driver')
    // findByIdDriver(@Param('id_driver') id_driver: number) {
    //     return this.driverCarInfoService.findByIdDriver(id_driver);
    // }

    @Post()
    create(@Body() ambulance: CreateAmbulanceDto) {
        return this.ambulancesService.create(ambulance);
    }
}
