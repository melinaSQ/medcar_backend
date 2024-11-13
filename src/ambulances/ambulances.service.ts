import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambulance } from './ambulance.entity';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';
// import {  CreateDriverCarInfoDto } from './dto
@Injectable()
export class AmbulancesService {
    constructor(@InjectRepository(Ambulance) private ambulanceRepository: Repository<Ambulance>) {}

    async create(ambulance: CreateAmbulanceDto) {
        const ambulanceInfoFound = await this.ambulanceRepository.findOneBy({id_company: ambulance.id_company});
        if (!ambulanceInfoFound) {
            const newAmbulanceInfo = this.ambulanceRepository.create(ambulance);
            return this.ambulanceRepository.save(newAmbulanceInfo);
        }
        const updatedCarInfo = Object.assign(ambulanceInfoFound, ambulance);
        return this.ambulanceRepository.save(updatedCarInfo);
    }

    // findByIdDriver(id_driver: number) {
    //     return this.driverCarInfoRepository.findOneBy({ id_driver: id_driver });
    // }

}
