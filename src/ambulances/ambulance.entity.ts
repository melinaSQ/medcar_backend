import { Company } from "src/companies/company.entity";
import { DriverTripOffers } from "src/driver_trip_offers/driver_trip_offers.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'ambulances'})
export class Ambulance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_company: number;

    @Column()
    ambulance_type: string;

    @Column()
    plate: string;

    //imagen del certificado
    @Column()
    sedes_resolution_code: string;

    //codigo de verificacion
    @Column()
    code: string;

    @ManyToOne(() => Company, (company) => company.id)
    @JoinColumn({ name: 'id_company' })
    company: Company;

    // Relación con conductores
    @ManyToMany(() => User, (driver) => driver.ambulances)
    drivers: User[];


}