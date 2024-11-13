import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from 'src/users/user.entity';
import { Rol } from '../roles/rol.entity';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
    ) {}

    async create(company: CreateCompanyDto) {

        const newCompany = this.companyRepository.create(company);
        const savedCompany = await this.companyRepository.save(newCompany);

        // Buscar al usuario asociado a la compañía
        const user = await this.userRepository.findOne({ where: { id: company.id_user }, relations: ['roles'] });

        if (user) {
            // Verificar si el usuario ya tiene el rol COMPANY
            const hasCompanyRole = user.roles.some(role => role.id === 'COMPANY');

            if (!hasCompanyRole) {
                // Buscar el rol COMPANY
                const companyRole = await this.rolesRepository.findOne({ where: { id: 'COMPANY' } });

                if (companyRole) {
                    // Agregar el rol COMPANY al usuario
                    user.roles.push(companyRole);
                    await this.userRepository.save(user); // Guardar los cambios en el usuario
                }
            }
        }

        return savedCompany;


    }

    findByIdUser(id_user: number) {
        // return this.companyRepository.findOneBy({ id_user: id_user });
        const companyFound = this.companyRepository.findOne({
            where: { id_user: id_user },
            relations: ['user', 'ambulances'] // Carga el usuario y las ambulancias asociadas
        });

        if (!companyFound) {
            throw new HttpException('No se encontró la compañía para este usuario', HttpStatus.NOT_FOUND);
        }
    
        return companyFound;
    }

    
}
