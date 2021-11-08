import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { environment } from '../../../../environments/environment';
import { AccountDetails } from '@interface/account-details';
import { Appointment } from '@interface/appointment';
import { billingAmount } from '@interface/billamount';
import { Clinic } from '@interface/clinic';
import { ClinicTiming } from '@interface/clinic-timing';
import { Doctor } from '@interface/doctor';
import { Patient } from '@interface/patient';
import { Payment } from '@interface/payment';
import { TelemedicineSetup } from '@interface/telemedicine-setup';
import { slotInterface } from '../schedule/schedule.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor-service/doctor.service';
import { LandingPageData } from '../../../interface/landingData';
import { Subscription } from 'rxjs';
import { ExternalLibraryService } from '../../../services/patient-service/utilsPayment';
import { DgPaymentServiceService } from '../../../services/patient-service/dg-payment-service.service';
import { HttpConstants } from '../../../services/http-constants';
import { BaseHttpService } from '../../../services/base-http.service';
import { MessageService } from '../../../services/message.service';
import { PatientService } from '../../../services/patient-service/patient.service';
declare let Razorpay: any;

@Component({
  selector: 'digi-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  doctorData = {
    photo: 'assets/images/user_placeholder.svg',
    name: 'Dr. Jenny Wilsson',
    qualification: 'General Medicine, MBBS, FCPS',
    clinicName: 'Amet Minim Hospita',
    rating: 5
  };


  doctor: Doctor;
  telemedicineSetup: TelemedicineSetup;
  doctorAccount: AccountDetails[] = [];
  patient: Patient;
  clinic: Clinic;
  slot: slotInterface;
  navigateDataSnap: any;
  isTelemedicine: boolean = false;
  isFetchingData: boolean = false;
  billingAmountServer: billingAmount[] = [];
  currentAppointmentAmount: billingAmount = billingAmount.default();
  chargeType: string = 'First Visit';
  rescheduledDocId: string = '';
  appointmentDocumentResponce: Appointment;
  RAZORPAY_OPTIONS = {
    key: environment.rozarPay.key_id,
    amount: '',
    name: 'DigiRecords',
    order_id: '',
    description: 'Appointment Charge',
    prefill: {
      name: '',
      email: '',
      contact: '',
      method: {},
    },
  };
  paymentResponse: Payment = Payment.default();
  isVisibleTop:boolean = false;
  selectedTime:ClinicTiming
  loadingText: string = 'Loading...';

  constructor(private _dynamicTitleService: DynamicTitleService,
    private router:Router,
    private activeRouter:ActivatedRoute,
    private doctorService:DoctorService,
    private razorpayService:ExternalLibraryService,
    private dgPaymentService: DgPaymentServiceService,
    private cdf: ChangeDetectorRef,
    private http:BaseHttpService,
    private msg:MessageService,
    private patientService:PatientService

    ) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state) {

      this.navigateDataSnap = this.router.getCurrentNavigation().extras.state.apptData;
      this.patient = this.navigateDataSnap.patient;
      this.clinic = this.navigateDataSnap.clinic;
      this.slot = this.navigateDataSnap.slot;
      this.isTelemedicine = this.navigateDataSnap.isTelemedicine;
      this.rescheduledDocId = this.navigateDataSnap.document_id;
      this.selectedTime = this.navigateDataSnap.time;

    } else {
      this.router.navigate(['/appointment/schedule']);
    
    }

   }

   doctorSub:Subscription;
   patientSub:Subscription;

  ngOnInit(): void {
    this._dynamicTitleService.setHeaderTitle('Appointment Overview');
    
   this.doctorSub =  this.doctorService.primaryDoctor$.subscribe((d: LandingPageData) => {
       this.doctor = d.doctor;
    this.telemedicineSetup = d.telemedicineSetup;
    this.doctorAccount = d.accountDetailsRes;
 
   
    
  });

  this.patientSub =  this.patientService.selectedPatient$.subscribe(r =>{
    
    if (
      this.doctorAccount &&
      this.doctorAccount.length > 0 &&
      this.isTelemedicine
    ) {

      this.getPaymentInfo();
      this.getUpcomingAppt();
    }

  })


  this.razorpayService
    .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
    .subscribe();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.doctorSub.unsubscribe();
    this.patientSub.unsubscribe();

  }
  
  getPaymentInfo() {
    this.dgPaymentService
      .getUpdateAmountFromServer(this.telemedicineSetup.billingDetails)
      .subscribe(
        (response) => {
          var res: any = response;
          if (res.status) {
            this.billingAmountServer = res.data;
          } else {
            this.calFromTeleMed();
          }
        },
        (err) => {
          this.calFromTeleMed();
        }
      );
  }

  calFromTeleMed() {
    this.telemedicineSetup.billingDetails.forEach((element) => {
      if (element.billingAmount) {
        var platFormPrice = Number(element.billingAmount + 14.75);
        var platFormPriceFee = (platFormPrice * 2) / 100;
        var tax = platFormPriceFee * 0.18;
        var feeIncludeTax =
          Number(platFormPriceFee.toFixed(2)) + Number(tax.toFixed(2));
        var platFormPriceFinal = platFormPrice + feeIncludeTax;
        element.receivableAmount = Number(platFormPriceFinal.toFixed(2));
        this.billingAmountServer.push(element);
      } else {
        this.billingAmountServer.push(element);
      }
    });
    this.currentAppointmentAmount = this.billingAmountServer.find(
      (x) => x.billingName == this.chargeType
    );
  }

  getFixed(currentAppointmentAmount: billingAmount) {
    return (
      Number(currentAppointmentAmount.receivableAmount) -
      Number(currentAppointmentAmount.billingAmount)
    ).toFixed(2);
  }

  getUpcomingAppt() {
    this.isFetchingData = true;
    const dataToSend = {
      patientId: this.patient.patient_id,
      doctorId: this.doctor.uid,
      timeStamp: this.slot.slotTime,
    };

    this.dgPaymentService.getUpcomingAppt(dataToSend).subscribe(
      (response) => {
        this.checkApptRes(response);
        this.isFetchingData = false;
      },
      (err) => {
        this.checkApptRes(err);
        this.isFetchingData = false;
      }
    );

    //this.checkApptRes(res)
  }

  checkApptRes(res) {
    if (res.isFollowUp) {
      this.chargeType = 'Follow Up';
    } else {
      this.chargeType = 'First Visit';
    }

    this.currentAppointmentAmount = this.billingAmountServer.find(
      (x) => x.billingName == this.chargeType
    );
  }


  bottomSheetType:string ='';
  bottomSheetTitle:string ='';
  open:boolean = false;

  openBottomSheetSelector(type: string) {

    this.bottomSheetType = type;

    if (type == 'patient') {
      this.bottomSheetTitle = 'Select / Add Patient'
    } else {
      this.bottomSheetTitle = 'Select Clinic'
    }

    this.open = true;


  }

  
  goBack() {

    this.router.navigate(['/appointment/schedule'], {
      relativeTo: this.activeRouter,
      state: { apptData: this.navigateDataSnap },
    });
  }


  saveAppt() {
    const body: AppointmentCreateInterface = {
      appointmentId: this.rescheduledDocId,
      doctorId: this.doctor.uid,
      patientId: this.patient.patient_id,
      clinicId: this.clinic.doc_id,
      patient_name: this.patient.patient_name,
      patient_last_name: this.patient.patient_last_name,
      patient_phone: this.patient.patient_phone,
      startDateTime: this.slot.slotTime,
      endDateTime: this.slot.endSlot * 1000,
      isTelimedicineAppointment: this.isTelemedicine,
      clinicTiming:this.selectedTime.doc_id || ''
    };

    this.isFetchingData = true;
    if (!this.rescheduledDocId) {
      this.createApptDoctor(body);
    } else {
      this.rescheduleAppointment(body);
    }

  }
  updatePatient() {

    this.dgPaymentService.updateDoctorId({ patient_id: this.patient.patient_id, doctor_id: this.doctor.uid }).subscribe(r =>{
            console.log(r);
    })

  }

  createApptDoctor(body) {
    this.http
      .makeAuthRequest('post', HttpConstants.appointment.create, body)
      .subscribe((res) => {
        this.isFetchingData = false;
        if (res.hasErrors()) {
          this.msg.createMessage(
            'error',
            'Something goes wrong please try again'
          );
          return false;
        } else {

          this.confirm = true;
          return true;

        }
      });
  }

  confirm:boolean = false;
  isError:boolean = false
  rescheduleAppointment(body) {
    this.http
      .makeAuthRequest(
        'post',
        HttpConstants.appointment.rescheduleAppointment,
        body
      )
      .subscribe((res) => {
        this.isFetchingData = false;
        if (res.hasErrors()) {
          this.msg.createMessage(
            'error',
            'Something goes wrong please try again'
          );
          return false;
        } else {
          this.confirm = true;
          return true;
        }
      });
  }

  processingPayment: boolean = false;
  orderResponse: any;

  initiatePaymentModal(billAmount: billingAmount) {


    const docId = (this.rescheduledDocId) ? this.rescheduledDocId : `${this.doctor.uid}_${this.patient.patient_id}_${new Date().getTime()}`
  
    this.appointmentDocumentResponce = {
      isTelimedicineAppointment: this.isTelemedicine,
      appointmentReason: '',
      additionalNotes: '',
      refDoctorName: '',
      refDoctorMobile: '',
      isCancelled: false,
      clinic_id: this.clinic.doc_id,
      appointment_status: false,
      case_id: '',
      clinic_timimg: '',
      channels: [this.patient.patient_id, this.doctor.uid],
      diseasesData: [],
      doc_id:docId,      
      doctor_id: this.doctor.uid,
      endDateTime: this.slot.endSlot * 1000,
      labtestURL: [],
      medication_effect: '',
      patient_id: this.patient.patient_id,
      patient_name:
        this.patient.patient_name + ' ' + this.patient.patient_last_name,
      patient_phone: this.patient.patient_phone,
      schedular_type: 'New',
      side_effect: '',
      startDateTime: this.slot.slotTime,
      symptomsData: [],
      timestamp: new Date().getTime(),
      triage_status: false,
      type: 'appointment',
      wellness_type: '',
      billing_id: '',
      discount: '0',
      bill_amount: 0,
      isBillPaid: false,
      billing_pay_status: 'unpaid',
      isCheckin: false,
      isOnline: false,
    };

    this.isFetchingData = true;
    let receiptNumber = `Receipt#${Math.random().toString(36).slice(2)}`; //`Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
    let orderDetails = {
      amount: Number(billAmount.receivableAmount) * 100,
      receipt: receiptNumber,
      payment_capture: 1,
    };

    this.dgPaymentService.createOrder(orderDetails).subscribe(
      (order) => {
        //console.log("TCL: CheckoutComponent -> initiatePaymentModal -> order", order);
        this.orderResponse = order;
        if (this.orderResponse.status) {
          this.RAZORPAY_OPTIONS.order_id = this.orderResponse.data.id;
          this.RAZORPAY_OPTIONS.amount = orderDetails.amount.toString();
          this.RAZORPAY_OPTIONS.prefill.name = this.patient.patient_name;
          this.RAZORPAY_OPTIONS.prefill.contact = this.patient.patient_phone;
          this.RAZORPAY_OPTIONS.prefill.email = this.patient.patient_email;
          this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(
            this
          );
          this.RAZORPAY_OPTIONS['modal'] = {
            ondismiss: this.cancelPaymentByUser.bind(this),
          };
          this.paymentResponse.appointmentId = this.appointmentDocumentResponce.doc_id;
          this.paymentResponse.channels = [
            this.doctor.uid,
            this.patient.patient_id,
          ];
          this.paymentResponse.patientId = this.patient.patient_id;
          this.paymentResponse.appointmentTime = this.slot.slotTime;
          this.paymentResponse.appointmentCreateDate = Math.floor(
            new Date().getTime()
          );
          this.paymentResponse.doctorId = this.doctor.uid;
          this.paymentResponse.doc_id =
            'payment_' +
            this.appointmentDocumentResponce.doc_id +
            '_' +
            this.patient.patient_id;
          this.paymentResponse.order_id = this.orderResponse.data.id;
          this.paymentResponse.receipt = this.orderResponse.data.receipt;
          this.paymentResponse.errorMsg = '';
          this.paymentResponse.isPaymentVerify = false;
          this.paymentResponse.verifyFailedReason = '';
          this.paymentResponse.appointmentBaseAmount =
            Number(this.currentAppointmentAmount.billingAmount) * 100;
          this.paymentResponse.appointmentCaptureAmount =
            Number(this.currentAppointmentAmount.receivableAmount) * 100;
          this.paymentResponse.appointmentAmountType = this.currentAppointmentAmount.billingName;
          this.paymentResponse.status = 'order';
          this.paymentResponse.method = '';
          this.paymentResponse.amount_refunded = 0;
          this.paymentResponse.refund_status = '';
          this.paymentResponse.fee = 0;
          this.paymentResponse.tax = 0;
          this.paymentResponse.captured = false;
          this.paymentResponse.description = '';
          this.paymentResponse.card_id = '';
          this.paymentResponse.bank = '';
          this.paymentResponse.wallet = '';
          this.paymentResponse.vpa = '';
          this.paymentResponse.email = '';
          this.paymentResponse.contact = '';
          this.paymentResponse.error_code = '';
          this.paymentResponse.error_description = '';
          this.paymentResponse.created_at = 0;
          this.paymentResponse.amount =
            Number(this.currentAppointmentAmount.receivableAmount) * 100;
          this.paymentResponse.currency = 'INR';
          this.paymentResponse.errorMsg = '';
          this.paymentResponse.subType = '';
          this.paymentResponse.isPaymentFetch = false;
          this.paymentResponse.type = 'payment';
          this.paymentResponse.refund_id = '';
          this.paymentResponse.captured = false;
          this.createDocumentOnServer(this.paymentResponse);
          this.createAppointmentPendding();

          let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
          razorpay.open();
          event.preventDefault();
          this.isFetchingData = false;
          this.cdf.detectChanges();
        } else {
          this.msg.createMessage('error','something goes wrong. Please try again',{nzDuration:3000});
          this.isFetchingData = false;
          this.cdf.detectChanges();
        }
      },
      (error) => {
        this.msg.createMessage('error','something goes wrong. Please try again',{nzDuration:3000});
        this.isFetchingData = false;
        this.cdf.detectChanges();
        this.isError = true;

        //console.log("TCL: CheckoutComponent -> initiatePaymentModal -> error", error);
      }
    );
  }

  cancelPaymentByUser() {
    this.paymentResponse.type = 'payment';
    this.paymentResponse.errorMsg = 'Payment Cancelled by User';
    this.paymentResponse.subType = 'USER_CANCELLED';
    this.paymentResponse.status = 'failed';
    this.paymentResponse.appointmentId = '';
    this.paymentResponse.appointmentTime = 0;
    this.createDocumentOnServer(this.paymentResponse);
    this.isError = true;
  }

  async razorPaySuccessHandler(response) {
    this.loadingText = 'Please wait, while we are verifying payment.';
    this.isFetchingData = true;
    this.paymentResponse.razorpay_payment_id = response.razorpay_payment_id;
    this.paymentResponse.razorpay_order_id = response.razorpay_order_id;
    this.paymentResponse.razorpay_signature = response.razorpay_signature;
    this.paymentResponse.status = 'created';
    this.createDocumentOnServer(this.paymentResponse);
    this.cdf.detectChanges();

    await this.dgPaymentService.verifyPayment(response).subscribe(
      (r) => {
        this.paymentResponse.isPaymentVerify = true;
      },
      (error) => {
        this.paymentResponse.verifyFailedReason = 'SERVER_ERROR';
        //console.log("failed to verify payment mark as under-review");
      }
    );

    await this.dgPaymentService
      .fetchPaymentDetailsById({
        payment_id: response.razorpay_payment_id,
        amount: this.RAZORPAY_OPTIONS.amount,
      })
      .subscribe(
        (res) => {
          var resData: any = res;
          if (resData.status) {
            this.paymentResponse.amount = resData.data.amount;
            this.paymentResponse.status = resData.data.status;
            this.paymentResponse.bank = resData.data.bank
              ? resData.data.bank
              : '';
            this.paymentResponse.card_id = resData.data.card_id
              ? resData.data.card_id
              : '';
            this.paymentResponse.method = resData.data.method;
            this.paymentResponse.order_id = resData.data.order_id;
            this.paymentResponse.description = resData.data.description;
            this.paymentResponse.amount_refunded = resData.data.amount_refunded;
            this.paymentResponse.refund_status = resData.data.refund_status
              ? resData.data.refund_status
              : '';
            this.paymentResponse.email = resData.data.email;
            this.paymentResponse.contact = resData.data.contact;
            this.paymentResponse.error_code = resData.data.error_code
              ? resData.data.error_code
              : '';
            this.paymentResponse.error_description = resData.data
              .error_description
              ? resData.data.error_description
              : '';
            this.paymentResponse.created_at = resData.data.created_at;
            this.paymentResponse.payment_id = resData.data.id;
            this.paymentResponse.isPaymentFetch = true;
            this.paymentResponse.captured = resData.data.captured;
            this.appointmentDocumentResponce.payment_id = this.paymentResponse.payment_id;
            this.appointmentDocumentResponce.billing_id = this.paymentResponse.payment_id;
            this.appointmentDocumentResponce.isBillPaid = true;
            this.appointmentDocumentResponce.billing_pay_status = 'paid';

            this.appointmentDocumentResponce.order_id = this.paymentResponse.order_id;
            this.appointmentDocumentResponce.bill_amount = this.paymentResponse.appointmentBaseAmount;
            this.paymentResponse.refund_id = '';
            this.paymentResponse.fee = resData.data.fee;
            this.paymentResponse.tax = resData.data.tax;
            this.paymentSuccess();
            this.cdf.detectChanges();
          } else if (!resData.status) {
            this.paymentResponse.isPaymentFetch = false;
            this.createDocumentWithPendingStatus();
            this.cdf.detectChanges();
          } else {
            this.paymentResponse.isPaymentFetch = false;
            this.createDocumentWithPendingStatus();
            this.cdf.detectChanges();
          }
        },
        (error) => {
          this.paymentResponse.isPaymentFetch = false;
          this.appointmentDocumentResponce.type = 'pending';
          //this.fetchPaymentRetry(response);
          this.cdf.detectChanges();
        }
      );
  }

  createAppointmentPendding() {
    this.appointmentDocumentResponce.type = 'pending';
    this.createDocumentOnServer(this.appointmentDocumentResponce);
    this.cdf.detectChanges();
  }

  createDocumentWithPendingStatus() {
    if (this.paymentResponse.status == 'created') {
      this.appointmentDocumentResponce.type = 'pending';
      this.dgPaymentService
        .sendPaymentMsg({
          payment_id: this.paymentResponse.payment_id,
          type: 'verifyFailed',
        })
        .subscribe((response) => {});
    }

    //console.log(JSON.stringify(this.paymentResponse));
    this.paymentResponse.type = 'payment';
    this.appointmentDocumentResponce.type = 'pending';
    this.paymentResponse.isPaymentFetch = false;
    this.paymentResponse.subType = 'verify_failed';
    this.createDocumentOnServer(this.appointmentDocumentResponce);
    this.createDocumentOnServer(this.paymentResponse);
    this.isFetchingData = false;
    this.loadingText = 'Please wait...';
    this.cdf.detectChanges();

    //this.ngxSmartModalService.open("paymentModal1");
  }

  async createDocumentOnServer(data) {
    this.isFetchingData = true;
    this.dgPaymentService.createDocument(data).subscribe(
      (res) => {
        //console.log(res);
        this.isFetchingData = false;
        this.cdf.detectChanges();
      },
      (err) => {
        this.createDocumentOnServer(data), (this.isFetchingData = false);
      }
    );
  }

  async paymentSuccess() {
    if (this.paymentResponse.status == 'created') {
      this.appointmentDocumentResponce.type = 'pending';
    } else {
      this.appointmentDocumentResponce.type = 'appointment';
    }

    await this.createDocumentOnServer(this.paymentResponse);
    await this.createDocumentOnServer(this.appointmentDocumentResponce);

    if (this.paymentResponse.status == 'created') {
      this.dgPaymentService
        .sendPaymentMsg({
          payment_id: this.paymentResponse.payment_id,
          type: 'verifyFailed',
        })
        .subscribe((response) => {});
    } else {
      this.dgPaymentService
        .sendMsgInfo({
          type: 'schedule',
          doctorName:
            this.doctor.doc_first_name + ' ' + this.doctor.doc_last_name,
          doctorUserName: this.doctor.username,
          appointmentTime: this.appointmentDocumentResponce.startDateTime,
          doctorId: this.doctor.uid,
          patientId: this.patient.patient_id,
          appointmentId: this.appointmentDocumentResponce.doc_id,
          patientPhone: this.appointmentDocumentResponce.patient_phone,
          doctorMobile: this.doctor.doc_mobile,
        })
        .subscribe((response) => {});
    }

    setTimeout(() => {
      this.isFetchingData = false;
      this.loadingText = 'Loading...';
     
      this.confirm =  true; 
       this.cdf.detectChanges();
   
    }, 4000);
  }

}


export interface AppointmentCreateInterface {
  //   doctorId: string;
  appointmentId?: string;
  patientId: string;
  clinicId: string;
  patient_name: string;
  patient_last_name: string;
  patient_phone: string;
  startDateTime: number;
  endDateTime: number;
  isTelimedicineAppointment: boolean;
  clinicTiming?:string
  doctorId?:string
}
