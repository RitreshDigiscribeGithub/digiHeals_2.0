import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-select-partner',
  templateUrl: './select-partner.component.html',
  styleUrls: ['./select-partner.component.less']
})
export class SelectPartnerComponent implements OnInit {

  DiagnosticPartnerList: any[] = [
    {
      name: 'SRL Diagnostics',
      logo: 'https://bbdu.ac.in/wp-content/uploads/2020/05/srl-diagnostics-logo.png',
      price: 18000,
      del: 18000,
      recommendation: true
    },
    {
      name: 'Suburban Diagnostics',
      logo: 'https://www.suburbandiagnostics.com/wp-content/themes/suburbandiagnosticsnew/images/suburbandiagnostics-logo.png',
      price: 13000,
      del: 15000,
      recommendation: false
    },
    {
      name: 'Dr Lal Pathlabs',
      logo: 'https://customercarelife.com/wp-content/uploads/2020/04/Dr-Lal-PathLabs.jpg',
      price: 13000,
      del: '15000',
      recommendation: false
    }
  ]

  MedicationPartnerList: any[] = [
    {
      name: 'Wellness Forever',
      logo: 'https://www.mangalamjobs.com/wp-content/uploads/2021/05/Wellness-Forever-logo.png',
      price: 560,
      del: 726,
      recommendation: true
    },
    {
      name: 'Vitamode Pharma',
      logo: 'https://www.vitamode.com.my/wp-content/themes/vitamode/images/vitalogo.png',
      price: 560,
      del: 726,
      recommendation: false
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
