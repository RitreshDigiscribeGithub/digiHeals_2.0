import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-chat-to-doctor',
  templateUrl: './chat-to-doctor.component.html',
  styleUrls: ['./chat-to-doctor.component.less']
})
export class ChatToDoctorComponent implements OnInit {
  sendTime: string = '10:12 AM';
  receivingTime: string = '11:00 AM';
  pushText: any[] = []
  text = '';
  callContainer: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  pickUpCall() {
    this.callContainer = true;
  }
  dropCall(ev) {
    this.callContainer = ev;
  }

  sendtext(textObj) {
    setTimeout(() => {
      this.pushText.push(textObj)
      this.text = ''
    }, 1000);
  }
}
