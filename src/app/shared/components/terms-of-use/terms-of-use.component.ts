import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'digi-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.less'],
})
export class TermsOfUseComponent implements OnInit {
  @Input() public open:boolean;
  constructor() {}

  ngOnInit(): void {

  }
}
