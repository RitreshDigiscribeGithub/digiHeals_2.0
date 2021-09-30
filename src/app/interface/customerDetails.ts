export interface customerDetails{

    customerId:number;
    patientId:string;
    patientFirstName:string;
    patientLastName:string;
    patientMobileNumber:string;
    patientMobileAlternet?:string;
    patientEmail:string;
    patientAlternatePhone:string | null
    customerAddresses?:Array<any>
    
}