import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BaseHttpService } from '@services/base-http.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { Doctor } from '@interface/doctor';

@Component({
  selector: 'digi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.less']
})
export class PersonalInfoComponent implements OnInit {

  part: number = 1;
  date: Date = new Date();
  dateObj = {
    day: () => this.getDay(),
    years: () => this.getYear()
  }

  allMonth: Array<{ label: string, value: number }> = [
    { label: 'Jan', value: 1 },
    { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 4 },
    { label: 'May', value: 4 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'Aug', value: 8 },
    { label: 'Sept', value: 9 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 },
    { label: 'Dec', value: 12 },
  ];

  allTitle: string[] = ["Mr", "Mrs", "Ms", "Dr", "Baby"];
  marriedStatus: string[] = ["Single", "Married", "Widow", "Divorcee"];
  validateForm: FormGroup;
  allCitiesState: any[] = [];
  allState: any[] = [];
  emailOptions: string[] = [];
  selectedDoctor: Doctor;
  @Output() nextForm_ = new EventEmitter<Boolean>();

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: BaseHttpService, private doctorService: DoctorService) { }


  ngOnInit(): void {

    this.validateForm = this.fb.group({
      doctor_id: ['', [Validators.required]],
      patient_title: ['Mr', [Validators.required]],
      patient_marital_status: [''],
      patient_phone: ['', [Validators.required]],
      patient_dob_year: ['',],
      patient_dob_month: ['',],
      patient_email: ['', [Validators.required, Validators.email]],
      patient_name: ['', [Validators.required]],
      patient_middle_name: [''],
      patient_last_name: ['', [Validators.required]],
      patient_gender: ['Male', [Validators.required]],
      patient_address_line_1: [''],
      patient_address_line_2: [''],
      landmark: [''],
      patient_state: [''],
      stateId: ['', [Validators.required]],
      patient_city: ['', [Validators.required]],
      patient_pincode: [null, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern('^[0-9]*$')]],
      phoneNumberPrefix: ['+91'],
      notification: [true],
      patient_age: [0],
      patient_age_month: [0],
      patient_age_days: [0],

    });

    this.activatedRoute.params.subscribe((params) => {
      const mobile = params.mobile;
      this.validateForm.get('patient_phone').setValue(mobile);
      this.validateForm.controls['patient_phone'].disable();

    })

    this.doctorService.primaryDoctor$.subscribe(r => {
      if (r) {
        this.selectedDoctor = r.doctor;
        this.validateForm.get('doctor_id').setValue(r.doctor.uid);
      }

    })


    this.validateForm.get('stateId').valueChanges.subscribe(val => {
      if (val) {
        this.validateForm.get('patient_state').setValue(val.stateName);
        this.getCitiesByStateId(val.stateId);
      }
    });
    this.getAllState();

  }

  getDay() {
    let day = []
    for (let i = 1; i <= 31; i++) {
      day.push(i)
    }
    return day;
  }

  getYear() {
    let year = [];
    for (let i = 1950; i <= this.date.getFullYear(); i++) {
      year.push(i)
    }
    return year;
  }


  nextForm() {

    if (this.part === 1) {
      if (!this.validateForm.controls['patient_name'].valid) {
        this.validateForm.controls['patient_name'].markAsDirty();
        this.validateForm.controls['patient_name'].updateValueAndValidity();
        return false
      }

      if (!this.validateForm.controls['patient_last_name'].valid) {
        this.validateForm.controls['patient_last_name'].markAsDirty();
        this.validateForm.controls['patient_last_name'].updateValueAndValidity();
        return false
      }

      this.part = 2;
      return true;
    } else {

      this.submitForm();
      return true
    }
  }

  submitForm(): void {

    const currentYear = moment().format('yyyy');
    const year = this.validateForm.get('patient_dob_year').value;
    const month = this.validateForm.get('patient_dob_month').value;
    if (year) {
      const years: any = (parseInt(currentYear) - parseInt(year))
      this.validateForm.get('patient_age').setValue(years);
    }

    if (month) {
      const months: any = (12 - parseInt(month))
      this.validateForm.get('patient_age_month').setValue(months);
    }



    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      localStorage.setItem('patientInfo', JSON.stringify(this.validateForm.value));
      this.nextForm_.emit();

    }

  }

  getAllState(): void {

    this.http.makePartnerRequest<any[]>({ method: 'get', url: '/api/v1/store/findAllState' }).subscribe(res => {
      if (res.data) {
        this.allState = res.data;
      }

    })


  }

  getCitiesByStateId(id: number) {
    if (id) {
      this.http.makePartnerRequest<any[]>({ method: 'POST', url: '/api/v1/store/findAllCityByStateId', data: { stateId: id } }).subscribe(res => {
        if (res.data) {
          this.allCitiesState = res.data;
        }

      })
    }

  }

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.emailOptions = [];
    } else {
      this.emailOptions = ['gmail.com', 'yahoo.com', 'icloud.com', 'hotmail.com', 'rediffmail.com'].map(domain => `${value}@${domain}`);
    }
  }

}
