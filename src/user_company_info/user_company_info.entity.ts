import { DriverTripOffers } from "src/driver_trip_offers/driver_trip_offers.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'user_company_info'})
export class UserCompanyInfo {


    @PrimaryColumn()
    id_user: number;

    @Column()
    name: string;

    // imagen nit de la empresa
    @Column()
    nit: string;

    @Column()
    phone: string;


    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id_user' })
    user: User;

}