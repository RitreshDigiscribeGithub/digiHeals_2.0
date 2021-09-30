import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'digi-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.less'],
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() public open:boolean;

  constructor() {}

  ngOnInit(): void {
  }
}
