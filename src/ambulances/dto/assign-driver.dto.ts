import { IsString, IsNotEmpty } from 'class-validator';
export class AssignDriverDto {

    @IsNotEmpty()
    id_driver: number;

    @IsNotEmpty()
    @IsString()
    plate: string;

    @IsNotEmpty()
    @IsString()
    code: string;

}