import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'digi-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.less'],
})
export class BottomSheetComponent implements OnInit {
  @Input() isOpen = false;
  @Input() title: string;
  @Output() public toggle = new EventEmitter<boolean>();
  @Input() height: string;
  constructor() {}

  ngOnInit(): void {}
}
