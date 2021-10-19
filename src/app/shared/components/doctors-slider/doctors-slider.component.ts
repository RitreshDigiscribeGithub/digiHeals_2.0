import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'digi-doctors-slider',
  templateUrl: './doctors-slider.component.html',
  styleUrls: ['./doctors-slider.component.less'],
})
export class DoctorsSliderComponent implements OnInit {
  @Input() public swiperConfig;
  @Input('dataArray') public dataArray: any[];
  @Output() public slideNum = new EventEmitter<number>();
  @Input() public activeColor: string;
  @Input() public activeSilde;

  constructor(private _cdrf: ChangeDetectorRef) {}
  carouselEvent(e) {
    this.slideNum.emit(e.startPosition);
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
