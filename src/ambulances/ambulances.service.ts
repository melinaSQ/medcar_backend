import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambulance } from './ambulance.entity';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';
import { AssignDriverDto } from './dto/assign-driver.dto';
// import {  CreateDriverCarInfoDto } from './dto
@Injectable()
export class AmbulancesService {
    constructor(@InjectRepository(Ambulance) private ambulancesRepository: Repository<Ambulance>) {}

    create(ambulance: CreateAmbulanceDto) {
        const newCar = this.ambulancesRepository.create(ambulance);
        return this.ambulancesRepository.save(newCar);
    }
    
    //metodo para actualizar un usuario
    // async update(id: number, ambulance: CreateAmbulanceDto) {
    //     console.log('UPDATE DATE: ', ambulance);
        
    //     //busca si existe un usuario con ese id del paarameetro
    //     const userFound = await this.usersRepository.findOneBy({id: id});

    //     //si el uusario no existe en la bdd
    //     if (!userFound) {
    //         throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    //     }

    //     //aqui se rempalzza la infor antigua por la nueva
    //     const updatedUser = Object.assign(userFound, user);
    //     //guarda la info en bdd
    //     return this.usersRepository.save(updatedUser);
    // }

    // findByIdDriver(id_driver: number) {
    //     return this.driverCarInfoRepository.findOneBy({ id_driver: id_driver });
    // }

    //************metodo para controlar el entrara como conductor
    async assignDriver(assignDriverDto: AssignDriverDto) {
        console.log('UPDATE DATE: ', assignDriverDto);

        const { id_driver, plate, code } = assignDriverDto;
        
        //busca si existe una ambulancia con ese placa del paarameetro
        const carFound = await this.ambulancesRepository.findOne({ 
            where: { plate: plate }
        });


        // const { id_driver, plate, code } = loginData;

        if (!carFound) {
            throw new HttpException('La placa no existe', HttpStatus.NOT_FOUND);
        }
        

        // Verifica el código de la ambulancia
        if (carFound.code !== code) {
            console.log('CODIGO INCORRECTO');
            throw new HttpException('El código de verificación es incorrecto', HttpStatus.FORBIDDEN);
        }

        carFound.id_driver = id_driver;

        await this.ambulancesRepository.save(carFound);
        
        console.log('Campo id_driver actualizado con éxito');
        return { message: 'Campo id_driver actualizado con éxito' };
    }

}
