import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@app/shared/utility/dynamic-title.service';
import { DgPaymentServiceService } from '@services/patient-service/dg-payment-service.service';
import { Subscription } from 'rxjs';
import { Doctor } from '@interface/doctor';
import { DigitalData, HealthDocuments, rxpartnerShare } from '@interface/health-document';
import { Patient } from '@interface/patient';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { PatientService } from '@services/patient-service/patient.service';
import { MessageService } from '../../services/message.service';
import { LandingPageData } from '../../interface/landingData';

@Component({
  selector: 'digi-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.less'],
})
export class UploadDocsComponent implements OnInit {
  constructor(private msg:MessageService, private titleService: DynamicTitleService,private digiHttp:DgPaymentServiceService,private patientService:PatientService,private doctorService:DoctorService ) {}
  ListItems: any[] = [];

  imgPreview = null;
  shouldShow:false;
  isUploadingFiles:boolean =false;
  patientSub:Subscription;
  doctorSub:Subscription;
  selectedPatient:Patient;
  selectedDoctor:LandingPageData;
  successPopUp:boolean = false;

  ngOnInit(): void {
    this.titleService.setHeaderTitle('DigiHeals | Scan Docs');
    this.patientSub = this.patientService.selectedPatient$.subscribe(data => {
      this.selectedPatient = data;
    })

    
    this.doctorSub = this.doctorService.primaryDoctor$.subscribe((r:LandingPageData) => {

      this.selectedDoctor = r;
     
      
    })

  }


  fileSave(fsEvent: any) {
    const selectFile = fsEvent.target.files;
    this.isUploadingFiles = true;

    for (let i = 0; i < selectFile.length; i++) {
      const types = selectFile[i].type.split('/')[0];
      const extension = selectFile[i].type.split('/')[1];
      let reader = new FileReader();
      reader.readAsDataURL(selectFile[i]);
      reader.onload = () =>  {
     const fileOutPut = reader.result;
    const uploadFile = {name:`patient_upload_${Math.floor(new Date().getTime())}_${selectFile[i].name}`,data:(fileOutPut as string).split(",")[1]}
     this.digiHttp.uploadFile(uploadFile).subscribe(r =>{

      const result:any = r;
      if(result.status) {
        const file = {
        type: types,
        name:result.name,
        uploadFileUrl:result.prescriptionUrl,
        extension: extension,
        fileName: selectFile[i].name.replace(`.${extension}`, ' '),
        size: (selectFile[i].size / (1024*1024)).toFixed(2)+' Mb',
        date: selectFile[i].lastModifiedDate,
        img: types === 'image' ? fileOutPut : null,
      }
       this.ListItems.push(file);

       if(this.ListItems.length === selectFile.length) {
         this.isUploadingFiles = false
       }
      }

     })

   }
    

    }

  }

  radio(e) {
    console.log(e.target.value);
  }
 

  removImgObj(i:number){
    this.ListItems.splice(i,1);
  }

  async saveAndShareDocs() {

    this.isUploadingFiles = true;
    const otherImgData = await this.ListItems.map((item) => {
      const fileObject: DigitalData = { name: item.name || '', text: '', photo: item.uploadFileUrl, thumb: item.uploadFileUrl, description: '', selected: false }
      return fileObject;
    });
    const pharmaPartner = []
    const labPartner = [];

    if(this.selectedDoctor.partners?.pharmacyPartner){
    
      const data:rxpartnerShare = {partnerId:this.selectedDoctor.partners?.pharmacyPartner[0].partnerId,partnerName:this.selectedDoctor.partners?.pharmacyPartner[0].partnerName,partnerServiceType:null,partnerStoreId:null};
      pharmaPartner.push(data);
     
    }

    if(this.selectedDoctor.partners?.labPartner){
          const data:rxpartnerShare = {partnerId:this.selectedDoctor.partners?.labPartner[0].partnerId,partnerName:this.selectedDoctor.partners?.labPartner[0].partnerName,partnerServiceType:null,partnerStoreId:null};
         labPartner.push(data);
    }


    if (otherImgData.length > 0) {
      const body: HealthDocuments = {
        doc_id: `digital_prec_${this.selectedPatient.patient_id}_${Math.floor(new Date().getTime())}`,
        patient_id: this.selectedPatient.patient_id,
        channels: [this.selectedPatient.patient_id, this.selectedDoctor.doctor.uid],
        doctor_id: this.selectedDoctor.doctor.uid,
        appointment_id: '',
        digital_data: otherImgData,
        endtime: Math.floor(new Date().getTime()),
        isOnline: true,
        timestamp: Math.floor(new Date().getTime()),
        type: 'digital_pres',
        uploadedBy: 'patient',
        isSentToPartner: false,
        pharmacyPartners:  pharmaPartner,
        labPartners:labPartner
      }

      this.digiHttp.createPrescription(body).subscribe(r =>{
        const res:any = r;
        this.isUploadingFiles = false;
        if(res && res.status) {
          this.msg.createMessage('success','Thanks You, you will receive a call shortly');
          this.successPopUp = true;
        } else {
          this.msg.createMessage('error','something went wrong please try again');
        }

      })

      console.log(body)
  }
}

}