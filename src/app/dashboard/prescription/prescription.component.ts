import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.less']
})
export class PrescriptionComponent implements OnInit {
  prescription = false;
  savedRxData:any =null;
  constructor( private router:Router,) { 

    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state &&  this.router.getCurrentNavigation().extras.state.rxData){
      this.savedRxData = this.router.getCurrentNavigation().extras.state.rxData;
    
    } else {
    this.router.navigate(['/records']);  
    }

  }

  ngOnInit(): void {
  }

}
