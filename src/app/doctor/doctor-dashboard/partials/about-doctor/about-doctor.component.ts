import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Doctor } from '@app/interface/doctor';
import { DoctorCMS } from '@app/interface/doctor-cms';
import { icon } from '@app/shared/utility/custom-icon';
import { MediaControlService } from '@app/shared/utility/media-control.service';

@Component({
  selector: 'about-doctor',
  templateUrl: './about-doctor.component.html',
  styleUrls: [
    './about-doctor.component.less',
    '../../doctor-dashboard.component.less',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AboutDoctorComponent implements OnInit {
  @ViewChild('fontBylength') fontBylength: ElementRef;
  @Input() doctor: Doctor;
  @Input() drCMS: DoctorCMS;
  @Input() location;
  pic =
    'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop';

  Overview: any[] = [
    { categoryName: 'About', active: true },
    { categoryName: 'Work Experience', active: false },
    { categoryName: 'Speciality', active: false },
  ];
  lists = ['About', 'Work Experience', 'Speciality'];

  right_icon;

  constructor(private _viewMedia: MediaControlService) {}

  ngOnInit(): void {
    if (this.doctor && this.doctor.aboutUs) {
      this.Overview.push({
        categoryName: 'About',
        active: true,
        text: this.doctor.aboutUs,
      });
    }

    if (this.doctor && this.doctor.workExperiences) {
      const text = this.doctor.workExperiences.map(
        (item) =>
          `${item.designation} - ${item.company} - ${item.startDate} ${
            item.endDate ? '-' : ''
          } ${item.endDate} <br>`
      );
      this.Overview.push({
        categoryName: 'Work Experience',
        active: false,
        text: text,
      });
    }

    if (this.doctor && this.doctor.specializations) {
      const text = this.doctor.specializations
        .map((item) => `${item}`)
        .join(', ');
      this.Overview.push({
        categoryName: 'Speciality',
        active: false,
        text: text,
      });
    }

    this.right_icon = icon.rigthArrow;
  }

  public num: number = 0;
  collapse(param) {
    this.num = param;
  }
}
