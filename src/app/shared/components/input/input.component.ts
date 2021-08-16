import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digi-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})

export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() isValid: boolean;
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
