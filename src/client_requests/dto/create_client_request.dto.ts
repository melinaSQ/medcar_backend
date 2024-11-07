export class CreateClientRequestDto {

    id_client: number;
    //extras
    patient_data: string;
    pickup_date: Date;
    //
    pickup_description: string;
    destination_description: string;
    pickup_lat: number;
    pickup_lng: number;
    destination_lat: number;
    destination_lng: number;
}