import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'digi-make-call',
  templateUrl: './make-call.component.html',
  styleUrls: ['./make-call.component.less']
})
export class MakeCallComponent implements OnInit {
  @Input() public callControl: boolean;
  @Output() public endCall = new EventEmitter<boolean>()
  constructor() { }
  calling: boolean = true;

  ngOnInit(): void {

    setTimeout(() => {
      this.calling = false;
    }, 4000);

  }
  dropCall() {
    this.endCall.emit(false)
  }
}


