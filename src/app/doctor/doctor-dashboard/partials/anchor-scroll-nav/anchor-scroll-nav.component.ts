import { ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MediaControlService } from '@app/shared/utility/media-control.service';

@Component({
  selector: 'anchor-scroll-nav',
  templateUrl: './anchor-scroll-nav.component.html',
  styleUrls: ['./anchor-scroll-nav.component.less'],
})
export class AnchorScrollNavComponent implements OnInit {
  @Input() public type: string;
  public scroll = [
    {
      Id: 'slide',
      tooltip: 'Home',
      iconName: 'home.svg',
    },
    {
      Id: 'doctor-appointment',
      tooltip: 'Appointment',
      iconName: 'calendar.svg',
    },
    {
      Id: 'about-doctor',
      tooltip: 'Overview',
      iconName: 'address.svg',
    },
    // {
    //   section: 'doctor-services',
    //   tooltip: 'Treatement',
    //   iconName: 'accessible.svg'
    // },
    {
      Id: 'doctor-gallery',
      tooltip: 'Gallery',
      iconName: 'images.svg',
    },
    {
      Id: 'doctor-testimonial',
      tooltip: 'Testimonial',
      iconName: 'time.svg',
    },
    // //  {
    // Id: 'education',
    // tooltip: 'education',
    // iconName: 'time.svg'
    // },
    {
      Id: 'doctor-clinic-locations',
      tooltip: 'Clinic Location',
      iconName: 'location.svg',
    },
    {
      Id: 'footer',
      tooltip: 'Contact',
      iconName: 'call.svg',
    },
  ];
  constructor(
    private _breakpoint: MediaControlService,
    private viewportScroller: ViewportScroller,
    private cdrf: ChangeDetectorRef
  ) {}

  jumpToSection(ID: string) {
    document.getElementById(ID).scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit(): void {}

  public willOnlyMobile: boolean;
  ngAfterViewChecked() {
    this.willOnlyMobile = this._breakpoint.mediaPort();
    this.cdrf.detectChanges();
  }
}
