import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MediaControlService } from '@app/shared/utility/media-control.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'doctor-testimonial',
  templateUrl: './doctor-testimonial.component.html',
  styleUrls: [
    './doctor-testimonial.component.less',
    '../../doctor-dashboard.component.less',
  ],
})
export class DoctorTestimonialComponent implements OnInit {
  @Input() reviews: reviews[];

  innerCard = {
    ['min-height']: '250px',
    display: 'flex',
    ['justify-content']: 'center',
    ['align-items']: 'center',
    ['border-radius']: '13px',
    border: '1px solid rgb(236, 235, 235)',
    padding: '10px',
  };
  constructor(
    private _viewMedia: MediaControlService,
    private _cdRef: ChangeDetectorRef
  ) {}
  persons: any[] = [
    {
      name: 'Mark Ruffalo',
      img: 'https://i.insider.com/5d3b271c36e03c17f03d6946?width=600&format=jpeg&auto=webp',
    },
    {
      name: 'Alex Wolff',
      img: 'https://vignette.wikia.nocookie.net/collider/images/1/1f/Alex-wolff-age-1529006828-view-0.jpg/revision/latest?cb=20181119020148',
    },
    {
      name: 'Katherine Langford',
      img: 'https://assets.capitalfm.com/2020/28/katherine-langford-1594918637-view-0.jpg',
    },
    {
      name: 'jason momoa',
      img: 'https://www.w3schools.com/howto/img_avatar.png',
    },
  ];

  ngOnInit(): void {}
  public slides: number;
  private cardAlignment() {
    if (this._viewMedia.mediaPort()) {
      this.slides = 1;
    } else {
      if (this.reviews.length == 1) {
        this.slides = 1;
      } else if (this.reviews.length == 2) {
        this.slides = 2;
      } else if (this.reviews.length == 3) {
        this.slides = 3;
      } else {
        this.slides = 3;
      }
    }
    this._cdRef.detectChanges();
  }
  ngAfterViewChecked(): void {
    this.cardAlignment();
  }
}

export interface reviews {
  name: string;
  description: string;
  displayOnPortal: boolean;
}
