import { Component, Input, OnInit } from '@angular/core';

@Component({ 
  selector: 'divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.less'],
})
export class DividerComponent implements OnInit {
  @Input() spacing: number;
  constructor() {}

  ngOnInit(): void {}
}
