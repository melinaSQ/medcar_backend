import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import storage = require('../utils/cloud_storage');
import { Rol } from '../roles/rol.entity';
@Injectable()

export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}
    
    //metodo para crear un nuevo usuario
    create(user: CreateUserDto) {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    //metodo para encontrar toda la info de la bdd
    findAll() {
        return this.usersRepository.find({ relations: ['roles'] });
    }

    //metodo para actualizar un usuario
    async update(id: number, user: UpdateUserDto) {
        console.log('UPDATE DAT: ', user);
        
        //busca si existe un usuario con ese id del paarameetro
        const userFound = await this.usersRepository.findOneBy({id: id});

        //si el uusario no existe en la bdd
        if (!userFound) {
            throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
        }

        //aqui se rempalzza la infor antigua por la nueva
        const updatedUser = Object.assign(userFound, user);
        //guarda la info en bdd
        return this.usersRepository.save(updatedUser);
    }
    
    
    //metodo para actualizar con la imagen de un usuario
    async updateWithImage(file: Express.Multer.File, id: number, user: UpdateUserDto) {
        
        const url = await storage(file, file.originalname);
        console.log('URL: ' + url);

        if (url === undefined && url === null) {
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const userFound = await this.usersRepository.findOneBy({id: id});

        if (!userFound) {
            throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
        }
        user.image = url;
        const updatedUser = Object.assign(userFound, user);
        return this.usersRepository.save(updatedUser);
        
    }
    
    /**

    async updateWithImage(file: Express.Multer.File) {
        const url = await storage(file, file.originalname);
        console.log('URL: ' + url);
    }
    */
}
