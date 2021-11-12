import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaControlService } from '@app/shared/utility/media-control.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'patient-education',
  templateUrl: './patient-education.component.html',
  styleUrls: [
    './patient-education.component.less',
    '../../doctor-dashboard.component.less',
  ],
})
export class PatientEducationComponent implements OnInit {
  drawer = false;
  innerCard = {
    ['min-height']: '250px',
    display: 'flex',
    ['justify-content']: 'center',
    ['align-items']: 'center',
    padding: '10px',
  };
  imageObject: Array<object> = [
    {
      video:
        'https://www.youtube.com/watch?v=VUKlx6wj9hA&ab_channel=mayankeshranjanmayankeshranjan',
      thumbImage:
        'https://njbmagazine.com/wp-content/uploads/2019/03/St.-Josephs-Health-Leapfrog.jpg',
      title: `Guided by Sri Satguru Jagjit Singh Ji's vision of making international quality healthcare accessible`,
      fileType: 'video',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores nostrum omnis aliquam voluptatibus esse aliquid expedita esse aliquid expedita debitis voluptatibus esse aliquid expedita esse aliquid aliquid expedita expedita esse aliquid aliquid expedita aliquid expedita aliquid expedita`,
    },
    {
      image:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/04/patnaaa-1586339232.jpg',
      thumbImage:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/04/patnaaa-1586339232.jpg',
      title:
        'Our Work Would Not Be Possible Without The Support Of Our Motivated Leadership Team',
      fileType: 'image',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores nostrum omnis aliquam voluptatibus esse aliquid expedita esse aliquid expedita debitis voluptatibus esse aliquid expedita esse aliquid aliquid expedita expedita esse aliquid aliquid expedita aliquid expedita aliquid expedita`,
    },
    {
      image:
        'https://d1e00ek4ebabms.cloudfront.net/production/6c42d8ba-9395-43d4-b6eb-a28a90d24993.jpg',
      thumbImage:
        'https://d1e00ek4ebabms.cloudfront.net/production/6c42d8ba-9395-43d4-b6eb-a28a90d24993.jpg',
      alt: 'Image alt',
      title: 'Top Healthcare Facilities',
      fileType: 'pdf',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores nostrum omnis aliquam voluptatibus esse aliquid expedita esse aliquid expedita debitis voluptatibus esse aliquid expedita esse aliquid aliquid expedita expedita esse aliquid aliquid expedita aliquid expedita aliquid expedita`,
    },
    {
      video: 'https://www.youtube.com/watch?v=7KK4HKM-BDc',
      thumbImage:
        'https://c0.wallpaperflare.com/preview/234/65/167/accident-adult-african-bandage.jpg',
      alt: 'Image alt',
      title: 'Patient recovery and transitions',
      fileType: 'image',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores nostrum omnis aliquam voluptatibus esse aliquid expedita esse aliquid expedita debitis voluptatibus esse aliquid expedita esse aliquid aliquid expedita expedita esse aliquid aliquid expedita aliquid expedita aliquid expedita`,
    },
    {
      video: 'https://www.youtube.com/watch?v=7KK4HKM-BDc',
      thumbImage:
        'https://c0.wallpaperflare.com/preview/234/65/167/accident-adult-african-bandage.jpg',
      alt: 'Image alt',
      title: 'Patient recovery and transitions',
      fileType: 'image',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores nostrum omnis aliquam voluptatibus esse aliquid expedita esse aliquid expedita debitis voluptatibus esse aliquid expedita esse aliquid aliquid expedita expedita esse aliquid aliquid expedita aliquid expedita aliquid expedita`,
    },
  ];
  constructor(
    private _viewMedia: MediaControlService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  public slides: number = 1;
  isSm: boolean = false;
  private cardAlignment() {
    if (this._viewMedia.mediaPort()) {
      this.isSm = true;
      this.slides = 1;
    } else {
      if (this.imageObject.length == 1) {
        this.slides = 1;
      } else if (this.imageObject.length == 2) {
        this.slides = 2;
      } else if (this.imageObject.length == 3) {
        this.slides = 3;
      } else {
        this.slides = 3;
        this.isSm = false;
      }
    }
    this._cdRef.detectChanges();
  }
  ngAfterViewChecked(): void {
    this.cardAlignment();
    this._cdRef.detectChanges();
  }
}
