
export interface storeUser {
    partnerStoreId:number;
    partnerId?:number;
    stateId?:number;
    cityId?:number;
    partnerStoreAddress:string;
    partnerStoreLat?:string;
    partnerStoreLong?:string;
    partnerStorePhone:string;
    partnerStoreContactPerson?:string;
    partnerStoreEmail?:string;
    pincodeId?:number;
    createdAt?: string | null;
    updatedAt?: string | null;

}
