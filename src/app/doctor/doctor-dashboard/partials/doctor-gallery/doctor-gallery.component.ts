import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DoctorCMS } from '@app/interface/doctor-cms';
import { MediaControlService } from '@app/shared/utility/media-control.service';
import { NgImageSliderComponent, NgImageSliderService } from 'ng-image-slider';
import { Observable } from 'rxjs';

@Component({
  selector: 'doctor-gallery',
  templateUrl: './doctor-gallery.component.html',
  styleUrls: [
    './doctor-gallery.component.less',
    '../../doctor-dashboard.component.less',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DoctorGalleryComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  @Input() galleryImg: DoctorCMS;
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  images = [];
  public thisDevice: boolean;
  public carouselHight: number;
  public btnName: string;
  isGalleryData: boolean = false;
  // getText: NgImageSliderComponent;
  slideData: NgImageSliderComponent;
  imageObject: Array<object> = [
    {
      video:
        'https://www.youtube.com/watch?v=VUKlx6wj9hA&ab_channel=mayankeshranjanmayankeshranjan',
      thumbImage:
        'https://njbmagazine.com/wp-content/uploads/2019/03/St.-Josephs-Health-Leapfrog.jpg',
      title: `Guided by Sri Satguru Jagjit Singh Ji's vision of making international quality healthcare accessible`,
      recovery:
        'https://i.pinimg.com/originals/14/c8/0c/14c80c8cf2c166373a357adc31037060.png',
    },
    {
      image:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/04/patnaaa-1586339232.jpg',
      thumbImage:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/04/patnaaa-1586339232.jpg',
      alt: 'Image alt',
      title:
        'Our Work Would Not Be Possible Without The Support Of Our Motivated Leadership Team',
      recovery:
        'https://heightlengthening.com/wp-content/uploads/2019/11/height-lengthening-doctor-patient.jpg',
    },
    {
      image:
        'https://d1e00ek4ebabms.cloudfront.net/production/6c42d8ba-9395-43d4-b6eb-a28a90d24993.jpg',
      thumbImage:
        'https://d1e00ek4ebabms.cloudfront.net/production/6c42d8ba-9395-43d4-b6eb-a28a90d24993.jpg',
      alt: 'Image alt',
      title: 'Top Healthcare Facilities',
      recovery:
        'https://www.parkercenter.net/content/uploads/2020/08/chin-augmentation-04c-male.jpg',
    },
    {
      video: 'https://www.youtube.com/watch?v=7KK4HKM-BDc',
      thumbImage:
        'https://c0.wallpaperflare.com/preview/234/65/167/accident-adult-african-bandage.jpg',
      alt: 'Image alt',
      title: 'Patient recovery and transitions',
      recovery:
        'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/03/Before_and_after_eye_bag_surgery-1296x728-gallery_slide1.jpg?w=1155',
    },
  ];

  constructor(private _viewMedia: MediaControlService) {}

  ngOnInit(): void {
    if (this.galleryImg.gallery && this.galleryImg.gallery.length > 0) {
      this.galleryImg.gallery.forEach((element) => {
        this.images.push({ path: element });
      });
      this.isGalleryData = true;
    }
  }

  ngAfterContentChecked(): void {
    this.resizeMediaGallery();
  }

  num = 0;
  nextBtn() {
    if (this.num < this.imageObject.length - 1) {
      this.num = this.num + 1;
      this.slider.next();
    }
  }
  prevBtn() {
    if (this.num != 0) {
      this.num = this.num - 1;
      this.slider.prev();
    }
  }
  ngAfterViewInit(): void {}
  styleObj: { width: string; height: string; space: number };
  resizeMediaGallery() {
    if (this._viewMedia.mediaPort()) {
      this.styleObj = { width: '100%', height: '35%', space: 3 };
    } else {
      this.styleObj = { width: '100%', height: '400px', space: 3 };
    }
  }
}
