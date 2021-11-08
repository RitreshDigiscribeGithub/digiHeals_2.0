
import { customerDetails } from './customerDetails';
import { storeUser } from './storeUser';


export interface orderDetails {

    active?:boolean;
    isAddedTocart?:boolean;
    prescriptionId:number;
    partnerId:number;
    invoiceTimestamp:number;
    digiPrescriptionId:string;
    digiPrescriptionURL:string;
    callNotes:string | null;
    partnerStore:storeUser | null
    customerDetail:customerDetails | null
    paymentTypeDetail: paymentTypeDetail | null
    paymentStatusDetails:paymentStatusDetails | null;
    teleCallerDetails:teleCallerDetails | null;
    teleCallingStatus:teleCallingStatus | null;
    telecallingStatusId:number | null,
    orders:Array<orderItems>,
    customerAddressDetails:customerAddressDetails | null;
    paymentTypeId:number | null;
    doctorDetails:doctorDetails,
    orderStatusId:number | null,
    invoiceId:string | null,
    invoicePathUrl:string | null,
    invoiceFileName:string | null,
    partnerDetails:partnerDetails,
    selectedSlotDateTime?:slotDateTime | null
}

export interface slotDateTime {
     selectedDate:string;
     slotStartTime:string;
     slotEndTime?:string;
}

export interface partnerDetails{
    isRemoteAPI: boolean
    partnerColorCode: string | null
    partnerId: number
    partnerLogoUrl: string | null
    partnerName: string | null
    partnerSubTypeId: number | null
    partnerTypeId: number | null

}
export interface doctorDetails {
    doctorMobileNumber:string,doctorName:string,doctorSpecialization:string,doctorId:string,cityId:number
}
export class orderItems {
    orderId?:number;
    isCatalog:boolean
    maskLabId:number;
    labName:string;
    discountOffered:number;
    amountRecieveable:number;
    isAppointmentRequired:boolean;
    orderCompleteTimestamp:number;
    partnerServicesType:{partnerServiceTypeId:number,partnerServiceName:string};
    storeAgentDetail:storeAgentDetail | null;
    orderStatusDetail:orderStatusDetail | null;
    partnerServiceTypeId: number | null;
    labPriceId:number | null;
    orderStatusId:number | null;
    public static default = (): orderItems => {
        return {
            orderId:null,
            maskLabId:null,
            isCatalog:false,
            labName:'',
            labPriceId:null,
            discountOffered:0,
            partnerServiceTypeId:1,
            partnerServicesType:{partnerServiceTypeId:1,partnerServiceName:'Visit at center'},
            amountRecieveable:0,
            isAppointmentRequired:false,
            orderCompleteTimestamp:null,
            storeAgentDetail:null,
            orderStatusId:1,
            orderStatusDetail:{orderStatusId: 1, orderStatusName: "Order Received"}
        }


    }

}

export class storeAgentDetail {
    storeAgentId:number;
    storeAgentName:string;
    storeAgentMobile:string;
    createdAt?:string;
    partnerId?:number;
    partnerStoreId?: number;
    storeAgentAddress?:string;
    storeAgentEmail?:string;
    storeAgentPassword?:string;
    storeAgentUserName?:string;
    updatedAt?:string;
    public static default = (): storeAgentDetail => {
        return{  storeAgentId:null,
        storeAgentName:'',
        storeAgentMobile:'',
        createdAt:'',
        partnerId:null,
        partnerStoreId: null,
        storeAgentAddress:null,
        storeAgentEmail:null,
        storeAgentPassword:'',
        storeAgentUserName:'',
        updatedAt:'',
        }

    }


 
}

interface maskLabTable {
    maskLabId:number;
    digiscribeLabId:string;
    labName:string;
}

interface orderStatusDetail {
    orderStatusId:number;
    orderStatusName:string;
}

export interface customerAddressDetails {

    customerId?:number;
    customerAddressId:number;
    customerAddressTypeId?:number | null;
    customerAddressLine1:string;
    customerAddressLine2:string;
    customerCity:string;
    customerState:string;
    customerPincode:string;

}

interface paymentTypeDetail {

    paymentTypeId:number;
    paymentTypeName:string;
}

interface paymentStatusDetails {

    paymentStatusId:number;
    paymentStatusName:string;

}

interface teleCallerDetails {
    telecallerId:number;
    telecallerName:string;
    telecallerMobile:string;
}

interface teleCallingStatus {

    telecallingStatusId:number;
    telecallingStatusName:string;
}