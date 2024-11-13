import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { Rol } from 'src/roles/rol.entity';
import { DriversPosition } from 'src/drivers_position/drivers_position.entity';
import { ClientRequests } from 'src/client_requests/client_requests.entity';
import { DriverTripOffers } from 'src/driver_trip_offers/driver_trip_offers.entity';
import { Ambulance } from 'src/ambulances/ambulance.entity';
// import { UserCompanyInfo } from 'src/user_company_info/user_company_info.entity';
// import { DriverCarInfo } from 'src/driver_car_info/driver_car_info.entity';


@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn() //autoicrementable
    id: number;

    @Column()
    name: string;
    
    @Column()
    lastname: string;

    @Column({ unique: true }) //que solo haya un usuario con ese email
    email: string;
    
    @Column({ unique: true })
    phone: string;
    
    @Column({ nullable: true })
    image: string;
    
    @Column()
    password: string;
    
    @Column({ nullable: true })
    notification_token: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    //***********RELACIONES */
    @JoinTable({
        
        name: 'user_has_roles',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    

    //relacion muscho a muchos a tabla roles
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[];

    @OneToMany(() => DriversPosition, driversPosition => driversPosition.id_driver)
    driversPosition: DriversPosition;

    @OneToMany(() => ClientRequests, clientRequests => clientRequests.id_client)
    clientRequests: ClientRequests;

    @OneToMany(() => ClientRequests, clientRequests => clientRequests.id_driver_assigned)
    clientRequestsDriverAssigned: ClientRequests;

    @OneToMany(() => DriverTripOffers, driverTripOffers => driverTripOffers.id_driver)
    driverTripOffers: DriverTripOffers;

    // @OneToMany(() => DriverCarInfo, driverCarInfo => driverCarInfo.id_driver)
    // driverCarInfo: DriverCarInfo;

    // @OneToMany(() => UserCompanyInfo, userCompanyInfo => userCompanyInfo.id_user)
    // userCompanyInfo: UserCompanyInfo;

    @JoinTable({
        
        name: 'driver_has_ambulance',
        joinColumn: {
            name: 'id_driver'
        },
        inverseJoinColumn: {
            name: 'id_ambulance'
        }
    })

    // Relación con ambulancias
    @ManyToMany(() => Ambulance, (ambulance) => ambulance.drivers)
    ambulances: Ambulance[];
    
   
    //para que encriptar la contraseña
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }
    
}