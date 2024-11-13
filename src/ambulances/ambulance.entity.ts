import { Company } from "src/companies/company.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'ambulances'})
export class Ambulance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_company: number;

    @Column({ nullable: true , unique: true})
    id_driver: number;

    @Column()
    ambulance_type: string;

    @Column({unique: true})
    plate: string;

    //imagen del certificado
    @Column()
    sedes_resolution_code: string;

    //codigo de verificacion
    @Column()
    code: string;

    @ManyToOne(() => Company, (company) => company.ambulances)
    @JoinColumn({ name: 'id_company' })
    company: Company;

    @ManyToOne(() => User, (user) => user.ambulance)
    @JoinColumn({ name: 'id_driver' })
    driver: User;

    // Relación con conductores
    // @ManyToMany(() => User, (driver) => driver.ambulances)
    // drivers: User[];


}