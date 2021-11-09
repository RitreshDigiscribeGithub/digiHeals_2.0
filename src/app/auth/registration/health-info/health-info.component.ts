import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '@interface/patient';
import { AuthGuard } from '@guards/auth-guard.service';
import { LandingPageData } from '@interface/landingData';
import { BaseHttpService } from '@services/base-http.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { HttpConstants } from '@services/http-constants';
import { MessageService } from '@services/message.service';
import { PatientService } from '@services/patient-service/patient.service';

@Component({
  selector: 'digi-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.less']
})
export class HealthInfoComponent implements OnInit {


  bloodGroups: string[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  healthForm: FormGroup;

  weightArray: number[] = [];
  heightArray: number[] = [];
  isLoading: boolean = false;
  patientInfo: Patient = Patient.default;
  personalFormData: any;
  mobile: string = '';
  constructor(private patientService: PatientService, private fb: FormBuilder, private HttpService: BaseHttpService, private msg: MessageService, private auth: AuthGuard, private activatedRoute: ActivatedRoute, private router: Router, private doctorService: DoctorService) { }

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  ngOnInit(): void {

    this.personalFormData = JSON.parse(localStorage.getItem('patientInfo'));

    this.healthForm = this.fb.group({
      patient_weight_kgs: [null],
      patient_height: [null],
      patient_blood_group: [''],
      isAllergic: [false],
      isIllness: [false],
      illnessBrief: [],
      allergicData: [],
      healthHistory: [],
      agree: [true, [Validators.required, Validators.requiredTrue]]
    });

    for (let i = 3; i < 130; i++) {
      this.weightArray.push(i);
    }
    for (let i = 50; i < 200; i++) {
      this.heightArray.push(i);
    }

    this.activatedRoute.params.subscribe((params) => {
      this.mobile = params.mobile;


    })
  }


  createPatient() {



    this.isLoading = true;
    const e = this.healthForm.value;
    this.patientInfo.patient_title = this.personalFormData.patient_title;
    this.patientInfo.patient_name = this.personalFormData.patient_name.trim();

    this.patientInfo.patient_last_name = this.personalFormData.patient_last_name.trim();
    this.patientInfo.patient_gender = this.personalFormData.patient_gender;
    this.patientInfo.patient_marital_status = this.personalFormData.patient_marital_status;
    this.patientInfo.patient_address_line_1 = this.personalFormData.patient_address_line_1;
    this.patientInfo.patient_address_line_2 = this.personalFormData.patient_address_line_2;
    this.patientInfo.patient_state = this.personalFormData.patient_state;
    this.patientInfo.patient_city = this.personalFormData.patient_city;
    this.patientInfo.patient_pincode = this.personalFormData.patient_pincode;
    this.patientInfo.patient_phone = this.mobile;
    this.patientInfo.patient_age = this.personalFormData.patient_age;
    this.patientInfo.patient_age_month = this.personalFormData.patient_age_month;
    this.patientInfo.channels = [this.personalFormData.doctor_id];

    if (e.allergicData) {
      this.patientInfo.knownAllergies = e.allergicData;
    }

    this.patientInfo.patient_weight_kgs = (e.patient_weight_kgs) ? parseInt(e.patient_weight_kgs) : 0;
    this.patientInfo.patient_height = (e.patient_height) ? parseInt(e.patient_height) : 0;
    this.patientInfo.patient_blood_type = e.patient_blood_group;


    this.HttpService.makeRequest<SignUpInterface>({ method: "POST", url: HttpConstants.patient.createPatient, data: this.patientInfo }).subscribe((response) => {
      if (response.hasErrors()) {
        this.msg.createNotification('error', 'something went wrong please try again');
        this.isLoading = false;

      } else {
        localStorage.setItem("token-digiheals", response.data.token);
        localStorage.setItem("patients", JSON.stringify([response.data.patient]));
        this.patientService.setSelectedPatient(response.data.patient);
        localStorage.removeItem('patientInfo');

        this.doctorService.mappedClinicData(response.data.doctorData);

        if (this.auth.redirectUrl) {
          this.router.navigate([this.auth.redirectUrl]);
          this.auth.redirectUrl = null;
        } else {

          this.router.navigate(["/home"], {
            replaceUrl: true
          });
        }
        // this.router.navigate(["../patient"], {
        //   relativeTo: this.activatedRoute,
        // });

      }
    });

  }
}


interface SignUpInterface {
  token: string;
  patient: Patient;
  doctorData?: LandingPageData[]
}
