export interface vitalsInfo {

    channels:string[];
    doc_id:string;
    doctor_id:string;
    patient_id:string;
    timestamp:number;
    type:string;
    vitalsData:Array<vitalsInner>
}

interface vitalsInner{
    name:string;
    unit:string;
    value:string
}