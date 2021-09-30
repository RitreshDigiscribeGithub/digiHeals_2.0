import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Doctor } from "@interface/doctor";
import { filter, map } from "rxjs/operators";
import { Clinic } from "@interface/clinic";
import { LandingPageData } from "@interface/landingData";
import { environment } from '../../../environments/environment';
import { Partner } from "@interface/partner";
import { ClinicTime } from "@interface/clinic-timing";


@Injectable({ providedIn: "root" })
export class DoctorService {
  private data: Subject<LandingPageData[]> = new BehaviorSubject<LandingPageData[]>(null);
  private labPartner: Subject<Partner[]> = new BehaviorSubject<Partner[]>(null);
  private pharmaPartner: Subject<Partner[]> = new BehaviorSubject<Partner[]>(null);
  public primaryDoctor: Subject<LandingPageData> = new BehaviorSubject<LandingPageData>(null);


  private doctorUsernameChanged: Subject<boolean> = new BehaviorSubject<
    boolean
  >(null);
  public username: string;
  get data$() {
    return this.data.asObservable().pipe(filter((node) => !!node)) || null;
  }

  get partnerLabData$() {

      return this.labPartner.asObservable().pipe(filter((node) => !!node));
  }

  get partnerPharamData$() {

    return this.pharmaPartner.asObservable().pipe(filter((node) => !!node));

  }

  get primaryDoctor$() {
    //return this.primaryDoctor$.asObservable().pipe(filter((node) => !!node)) || this.getDoctor();


    return this.primaryDoctor.asObservable().pipe(
      map((node) => {
        if (!node) {
          return this.getDoctor();
        } else {
          return node;
        }
      })
    )
 
  }

  get getDoctorData() {


    return this.primaryDoctor.asObservable().pipe(
      map((node) => {
        if (!node) {
          return this.getDoctor();
        } else {
          return node;
        }
      })
    )
 
  }


  pushDataPartner(data: Partner[],type) {
    if(type === 'lab'){
    this.labPartner.next(data);
    } else {
      this.pharmaPartner.next(data);

    }
  }

  pushData(data: LandingPageData[]) {
    this.data.next(data);
  //  this.setPrimaryDoctor(data);
  }
  get doctorUsernameChanged$() {
    return this.doctorUsernameChanged
      .asObservable()
      .pipe(filter((node) => !!node));
  }

  setPrimaryDoctor(data: LandingPageData) {
    localStorage.setItem(`selectedDoctor`, JSON.stringify(data));
    this.primaryDoctor.next(data);
  }
  getDoctor() {

  const d =  JSON.parse(localStorage.getItem(`selectedDoctor`));
   return  d ? d : null;

  }
  pushdoctorUsernameChangedData(data: boolean) {
    this.doctorUsernameChanged.next(data);
  }


  async mappedClinicData(response:LandingPageData[]){


    await response.forEach(element => {
      const clinicTimes: ClinicTime[] = [];
  
             for (
      let index = 0;
      index < element.clinicTimings.length;
      index++
    ) {
      const clinicTiming = element.clinicTimings[index];
      const days: string[] = [];
      let daysNumber: number[] = [];
  
      if (
        clinicTiming.monStatus &&
        clinicTiming.tueStatus &&
        clinicTiming.wedStatus &&
        clinicTiming.thuStatus &&
        clinicTiming.friStatus &&
        clinicTiming.satStatus &&
        clinicTiming.sunStatus
      ) {
        days.push("Mon - Sun");
        daysNumber = [0, 1, 2, 3, 4, 5, 6]
      } else {
        if (clinicTiming.monStatus) {
          days.push("Mon");
          daysNumber.push(1)
        }
        if (clinicTiming.tueStatus) {
          days.push("Tue");
          daysNumber.push(2)
  
        }
        if (clinicTiming.wedStatus) {
          days.push("Wed");
          daysNumber.push(3)
  
        }
        if (clinicTiming.thuStatus) {
          days.push("Thu");
          daysNumber.push(4)
  
        }
        if (clinicTiming.friStatus) {
          days.push("Fri");
          daysNumber.push(5)
  
        }
        if (clinicTiming.satStatus) {
          days.push("Sat");
          daysNumber.push(6)
  
        }
        if (clinicTiming.sunStatus) {
          days.push("Sun");
          daysNumber.push(0)
  
        }
      }
      const clinicTime: ClinicTime = {
        clinicId: clinicTiming.clinicId,
        clinicTimingId: clinicTiming.doc_id,
        timings: `${clinicTiming.starttime} - ${clinicTiming.endtime}`,
        days: days.join(", "),
        disableDays: daysNumber,
        isVirtualClinic: clinicTiming.isVirtualClinic,
        ...clinicTiming
      };
      clinicTimes.push(clinicTime);
    }
  
  
    for (let index = 0; index < element.clinics.length; index++) {
  
      const clinic = element.clinics[index];
      const filteredClinicTimings = clinicTimes.filter(
        (x) => x.clinicId == clinic.doc_id
      );
      const filteredTimings = element.clinicTimings.filter(
        (x) => x.clinicId == clinic.doc_id
      );
      clinic.clinicTimings = filteredClinicTimings;
      clinic.timings = filteredTimings;
    }
    {
      const virtualClinic = element.clinics.find(
        (x) => x.isVirtualClinic
      );
      element.virtualClinic = virtualClinic;
    }
  
    {
      let actualClinic = element.clinics.find(
        (x) => !x.isVirtualClinic
      );
      if (!actualClinic) {
        actualClinic = element.virtualClinic;
      }
      element.actualClinic = actualClinic;
    }
  
  });
  
  
  this.pushData(response);
  const d =  JSON.parse(localStorage.getItem(`selectedDoctor`));
    if(!d) {

      this.setPrimaryDoctor(response[0]);
    } else {

      const r = response.find(r =>{
        return  r.doctor.uid === d.doctor.uid;
       })
       
       if(r) {
         this.setPrimaryDoctor(r);
       }
    }

 
  }

  decrypt(textToDecrypt : string){

    // let _key = CryptoJS.enc.Utf8.parse(environment.cryptoKey);
     
    // return  CryptoJS.AES.decrypt(
    //    textToDecrypt, environment.cryptoKey, {
    //     keySize: 16,
    //     iv: _key,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    //   }).toString(CryptoJS.enc.Utf8)

  }

}
