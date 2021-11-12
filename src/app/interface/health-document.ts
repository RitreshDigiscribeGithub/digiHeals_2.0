export interface DigitalData {
    name: string;
    photo: string;
    selected?: boolean;
    text: string;
    thumb: string;
    description: string;
    mimeType?:string
  }
  
  export interface HealthDocuments {
    appointment_id: string;
    channels: string[];
    digital_data?: DigitalData[];
    doc_id: string;
    doctor_id: string;
    endtime?: any;
    isOnline?: boolean;
    patient_id: string;
    timestamp: any;
    type?: string;
    uploadedBy?:string;
    labPartners?:Array<rxpartnerShare>,
    pharmacyPartners?:Array<rxpartnerShare>
    doctr_id?:string;
    rxUrl?:string;
    isSentToPartner?:boolean
    
  }

  export interface HealthDocumentWrapper {
    name: string;
    url: string;
    doc_id: string;
    doctor_id: string;
    patient_id: string;
    timestamp: number;
    date: string;
    type: string;
    uploadedBy?:string
  }
  

  export interface rxpartnerShare {

    partnerId:number;
    partnerName:string;
    partnerStoreId?:number;
    partnerServiceType?:Array<{partnerSubTypeId:number,partnerSubTypeName:string}>

}
