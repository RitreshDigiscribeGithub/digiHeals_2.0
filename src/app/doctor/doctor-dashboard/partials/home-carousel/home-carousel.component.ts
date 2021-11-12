import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: [
    './home-carousel.component.less',
    '../../doctor-dashboard.component.less',
  ],
})
export class HomeCarouselComponent implements OnInit {
  slides: any[] = [
    'https://assets.lemonaidhealth.com/web/brochure/images/covid-19/taking-blood-desktop.svg',
    'https://miro.medium.com/max/2560/1*-qZGJe4dD5TouvYTOrRXog.png',
    'https://previews.123rf.com/images/nonwarit/nonwarit1712/nonwarit171200012/91479551-close-up-view-of-female-doctor-hands-filling-patient-registration-form-healthcare-and-medical-concep.jpg',
    'https://images.axios.com/Y_aLXhKjql7lEr3VZWKz-523u8c=/0x0:5568x3132/1920x1080/2020/03/13/1584109130876.jpg',
  ];
  constructor() {}

  ngOnInit(): void {}

}
