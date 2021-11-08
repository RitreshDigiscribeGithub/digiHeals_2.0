import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { Patient } from '@interface/patient';
import { PatientService } from '@services/patient-service/patient.service';
import { LandingPageData } from '@interface/landingData';
import { ClinicTime } from '@interface/clinic-timing';
import { Clinic } from '@interface/clinic';
import * as moment from 'moment';
import { HttpConstants } from '@services/http-constants';
import { BaseHttpService } from '@services/base-http.service';
import { MessageService } from '@services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'digi-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
})
export class ScheduleComponent implements OnInit {
  open: boolean = false;

  breakpoint2 = {
    responsive: {
      0: { items: 3 },
      400: { items: 3 },
      740: { items: 3 },
      940: { items: 4 },
    },
  };


  scrollConfig(breakpoint): OwlOptions {
    return {
      loop: false,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      nav: false,
      ...breakpoint,
    };
  }

  updateDateCalender: Date[] = [];



  patientSub: any;
  doctorSub: any;
  selectedPatient: Patient;
  selectedDoctor: LandingPageData;
  isActive: boolean = false;
  isTeleMedicine: boolean = true;
  userSelectedDate: Number;
  bottomSheetType: string = '';
  bottomSheetTitle: string = '';

  constructor(private _dynamicTitleService: DynamicTitleService, private patientService: PatientService, private doctorService: DoctorService, private _cdrf: ChangeDetectorRef,
    private http: BaseHttpService,
    private msg: MessageService,
    private router: Router,
    private activeRouter_: ActivatedRoute
  ) { }

  async ngOnInit() {
    this._dynamicTitleService.setHeaderTitle('Schedule Appointment');

    this.patientSub = this.patientService.selectedPatient$.subscribe(data => {
      this.selectedPatient = data;
    })

    this.doctorSub = this.doctorService.getDoctorData.subscribe(r => {
      this.selectedDoctor = r;
    })

    this.updateDateCalender = await this.nextWeek();


    if( history.state && history.state.apptData){
      this.routerLinkData = history.state.apptData;

      if(this.routerLinkData){
             
        console.info(this.routerLinkData);

        this.selectedTime = this.routerLinkData.time;
        this.isTeleMedicine= this.routerLinkData.isTelemedicine;
        this.userSelectedSlot= this.routerLinkData.slot;
        this.selectedDateCalender = new Date(this.routerLinkData.date);
        this.rescheduledDocId  = this.routerLinkData.document_id;   
        this.dateChanged(this.selectedDateCalender)
          
      }
      
    } else {

      this.selectedDateCalender = this.updateDateCalender[0];
      this.dateChanged(this.selectedDateCalender)

    }
  }


  dates = (startDate, num) => Array.from(
    { length: num },
    (_, i) => new Date(startDate.getTime() + (i * 60000 * 60 * 24))
  );


  nextWeek = async () => {
    let date = new Date();
    date.setDate(date.getDate());
    return this.dates(date, 10);
  }
  compareDate(selectedDate,date) {


    if(moment(selectedDate).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY')) {
      return true
    } else {
      return false
    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.doctorSub.unsubscribe();
    this.doctorSub.unsubscribe();

  }
  changeDate(date) {
    this.selectedDateCalender = date;
  }



  openBottomSheetSelector(type: string) {

    this.bottomSheetType = type;

    if (type == 'patient') {
      this.bottomSheetTitle = 'Select / Add Patient'
    } else {
      this.bottomSheetTitle = 'Select Clinic'
    }

    this._cdrf.detectChanges();

    this.open = true;

  }

  changeApptToggle(e: boolean) {
    this.isTeleMedicine = e;

    if (this.isTeleMedicine) {
      this.selectedClinic = this.selectedDoctor.virtualClinic;
    } else {
      this.selectedClinic = this.selectedDoctor.actualClinic;
    }

    this.dateChanged(this.selectedDateCalender);
    this.userSelectedSlot = null;
    this.selectedTime = null;
    this.finalSlots = [];

  }

  getAcutalClinic() {
    const clinic = this.selectedDoctor.clinics.filter(item => {
      return !item.isVirtualClinic
    })

    console.log(clinic);
    return clinic.length > 1 ? true : false;

  }


  selectedTime: ClinicTime = null;
  currentStime: number;
  loopTime: number;
  currentTimeSlot: number = 15;
  currentEtime: number;
  doctorSlots: any[] = [];
  selectedDateCalender: Date;
  clinicTimings: any[] = []
  routerLinkData: any;
  rescheduledDocId: string = '';
  isFetchingData: boolean = false;
  selectedClinic: Clinic;



  dateChanged(date) {

    this.clinicTimings = [];
    this.selectedDateCalender = date;
    const selectDay = moment(this.selectedDateCalender).weekday();

    if (this.isTeleMedicine) {
      const clinicTimeOfDay = this.selectedDoctor.virtualClinic.clinicTimings.filter((item) => {
        return (item.disableDays.indexOf(selectDay) != -1)
      })
      this.clinicTimings = clinicTimeOfDay;
      if (this.clinicTimings.length > 0) {
        // this.selectedTime = this.selectedTime ? this.selectedTime : this.clinicTimings[0];

        this.getDoctorSlotsSever(this.selectedDateCalender, this.selectedDoctor.doctor.uid, this.selectedDoctor.virtualClinic.doc_id);
  
      } else {
        this.userSelectedSlot = null;
        this.selectedTime = null;
      }

    } else {
      const clinicTimeOfDay = this.selectedDoctor.actualClinic.clinicTimings.filter((item) => {
        return (item.disableDays.indexOf(selectDay) != -1)
      })
      this.clinicTimings = clinicTimeOfDay;
      if (this.clinicTimings.length > 0) {
        // this.selectedTime = this.selectedTime ? this.selectedTime : this.clinicTimings[0];
        this.getDoctorSlotsSever(this.selectedDateCalender, this.selectedDoctor.doctor.uid, this.selectedDoctor.actualClinic.doc_id);

      }
      else {
        this.userSelectedSlot = null;
        this.selectedTime = null;
      }

    }



  }

  getDoctorSlotsSever(date, uid, clinicId) {
    this.isFetchingData = true;

    const now = moment(date);
    const startofDayEpoc = new Date(now.startOf('day').toString()).getTime();
    const endofDayEpoc = new Date(now.endOf('day').toString()).getTime();

    const data = { startDate: startofDayEpoc, endDate: endofDayEpoc, doctorId: uid, clinicId: clinicId };

    this.http.makeAuthRequest('post', HttpConstants.appointment.getSlots, data).subscribe(r => {
      this.isFetchingData = false;
      if (r.data) {
        const res: any = r.data
        this.doctorSlots = res;
      }

      if (this.selectedTime) {
        this.showSlots(this.selectedTime);
      }

    })

  }


  finalSlots: slotInterface[] = []
  Slots: slotInterface[] = [];
  userSelectedSlot: slotInterface;

  showSlots(data) {
    var dataClinic = data;
    var disabledDay = [];
    this.Slots = [];
    this.finalSlots = [];
    this.userSelectedSlot = null;

    var currentDate = new Date(this.selectedDateCalender);
    var day = moment(currentDate).format("DD");
    var month = moment(currentDate).format("MM");

    var year = moment(currentDate).format("YYYY");

    var combinationDate3 =
      month + "/" + day + "/" + year + " " + data.starttime;
    var combinationDate4 = month + "/" + day + "/" + year + " " + data.endtime;

    var StartTime =
      moment(combinationDate3, "MM/DD/YYYY HH:mm").valueOf() / 1000;
    var EndTimeS =
      moment(combinationDate4, "MM/DD/YYYY HH:mm").valueOf() / 1000;
    var currentTimeDate = Math.floor(new Date().getTime()) / 1000;

    if (currentTimeDate > EndTimeS) {
      this.finalSlots = [];
      return false;
    }

    if (dataClinic.monStatus === false) {
      disabledDay.push(1);
    }
    if (dataClinic.tueStatus === false) {
      disabledDay.push(2);
    }
    if (dataClinic.wedStatus === false) {
      disabledDay.push(3);
    }
    if (dataClinic.thuStatus === false) {
      disabledDay.push(4);
    }
    if (dataClinic.friStatus === false) {
      disabledDay.push(5);
    }
    if (dataClinic.satStatus === false) {
      disabledDay.push(6);
    }
    if (dataClinic.sunStatus === false) {
      disabledDay.push(7);
    }

    this.currentStime = StartTime;
    this.currentEtime = EndTimeS;
    this.loopTime = StartTime;

    this.startLoop();
    return true
  }

  startLoop() {
    var time = this.currentTimeSlot;

    if (
      this.loopTime == this.currentEtime - 60 * time ||
      this.loopTime > this.currentEtime - 60 * time
    ) {
      this.Slots.push({ slotTime: this.currentStime, status: "" });

      this.Slots.sort((x, y) => {
        return x.slotTime - y.slotTime;
      });

      var data = this.Slots;

      for (var c = 0; c < data.length; c++) {
        var found = this.doctorSlots.some((el) => {
          //    alert(data[c].slotTime);
          return el.startDateTime === data[c].slotTime * 1000;
        });
        if (!found) {
          if (new Date().getTime() / 1000 > data[c].slotTime) {
          } else {
            this.finalSlots.push({
              slotTime: data[c].slotTime * 1000,
              endSlot: data[c].slotTime + 60 * time,
              status: "avail",
            });
          }
        } else {
          
          // finalSlots1.push({slotTime:data[c].slotTime,status:'block'});
        }
      }

    } else {
      time = this.currentTimeSlot;
      this.Slots.push({ slotTime: this.loopTime + time * 60, status: "block" });

      this.loopTime = this.loopTime + time * 60;
      // this.setState({loopTime: this.state.loopTime + 15*60}, () => {

      this.startLoop();
      //});
    }
  }

  changeTime(item: ClinicTime) {
    if (item != this.selectedTime)
      this.selectedTime = item;
       this.showSlots(item);
  }

  selectSlot(slot: slotInterface) {
    this.userSelectedSlot = slot;
  }

  bookAppointment() {


    if (!this.selectedTime) {
      this.msg.createMessage('error', 'Please select appointment time');
      return false;
    }
    if (!this.userSelectedSlot) {
      this.msg.createMessage('error', 'Please select appointment slot');
      return false;
    }

    const selectedClinic = this.isTeleMedicine ? this.selectedDoctor.virtualClinic : this.selectedDoctor.actualClinic;
    const appData = { clinic: selectedClinic, time: this.selectedTime, slot: this.userSelectedSlot, date: this.selectedDateCalender, patient: this.selectedPatient, isTelemedicine: this.isTeleMedicine, document_id: this.rescheduledDocId }
    this.router.navigate(['../overview'], {
      relativeTo: this.activeRouter_,
      state: { apptData: appData }
    });
    return true

  }



}


export interface slotInterface {

  slotTime: number;
  endSlot?: number;
  status: string;
}