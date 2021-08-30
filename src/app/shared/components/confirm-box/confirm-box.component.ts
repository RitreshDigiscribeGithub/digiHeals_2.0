import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'digi-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.less']
})
export class ConfirmBoxComponent implements OnInit {
  @Input() public image: string;
  @Input() public template: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {

  }

  close() {

  }
}
