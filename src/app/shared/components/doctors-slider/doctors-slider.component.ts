import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { Doctor } from '../../../interface/doctor';
import { LandingPageData } from '../../../interface/landingData';

@Component({
  selector: 'digi-doctors-slider',
  templateUrl: './doctors-slider.component.html',
  styleUrls: ['./doctors-slider.component.less'],
})
export class DoctorsSliderComponent implements OnInit {
  activeColor: string = '#2795A0';
  activeSilde:number;
  allDoctorSub:any;
  allDoctors:LandingPageData[] = [];
  color: string = '#2795A0';

  swiperConfig =  {
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 4 },
    },
  };


  constructor(private _cdrf: ChangeDetectorRef, private doctorService:DoctorService) {}
  carouselEvent(e) {
   this.activeSilde = e;

  }
  ngOnInit(): void {
    this.allDoctorSub =   this.doctorService.data$.subscribe(r =>{
      this.allDoctors = r;
    })

  }

  ngAfterViewInit(): void {}
}
