import { DriverTripOffers } from "src/driver_trip_offers/driver_trip_offers.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'ambulances'})
export class Ambulances {

    @PrimaryColumn()
    id: number;

    @Column()
    id_company: number;

    @Column()
    ambulance_type: string;

    @Column()
    plate: string;

    //iamgen del certificado
    @Column()
    sedes_resolution_code: string;

    //codigo de verificacion
    @Column()
    code: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id_driver' })
    driver: User;

}