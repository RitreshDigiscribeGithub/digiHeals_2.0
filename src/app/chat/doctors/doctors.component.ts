import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.less']
})
export class DoctorsComponent implements OnInit {
  tab: number = 1;
  constructor(private _router: Router) { }

  doctorsList: any[] = [
    { username: 'Arpit_Shrimal23', name: 'Arpit Shrimal' },
    { username: 'Jitendra', name: 'Jitendra Chaudhary' },
    { username: 'mohammad_Isha', name: 'Mohammad Isha Khan' },
    { username: 'Pradeep', name: 'Pradeep Salgia' },
    { username: 'smith', name: 'Dave Smith' },
    { username: 'Shreeram_v_123', name: 'Shreeram Verma' },
    { username: 'Dubey_ji', name: 'Paritosh Dubey' },
    { username: 'Vikram_Jain', name: 'Vikram Jain' },
    { username: 'Vikram_Jain', name: 'Vikram Jain' },
    { username: 'Nirmal_Jain', name: ' Nirmal Jain' },
  ]

  ngOnInit(): void {
  }
  toChat(username) {
    this._router.navigateByUrl(`chat/doctors/${username}`)
  }
}
