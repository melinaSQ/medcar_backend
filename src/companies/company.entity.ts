import { DriverTripOffers } from "src/driver_trip_offers/driver_trip_offers.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'companies'})
export class Company {

    @PrimaryGeneratedColumn() //autoicrementable
    id: number;

    @Column()
    id_user: number;

    @Column()
    name: string;

    // imagen nit de la empresa
    @Column()
    nit: string;

    @Column()
    phone: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id_user' })
    user: User;



}