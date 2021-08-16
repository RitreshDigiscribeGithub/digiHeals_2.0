import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digi-affix',
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.less']
})
export class AffixComponent implements OnInit {
  @Input() public toBottom: string;
  constructor() { }

  ngOnInit(): void {
  }

}
