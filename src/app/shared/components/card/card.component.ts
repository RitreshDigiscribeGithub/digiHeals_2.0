import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  styleCard = {
    'border': '1.3px solid #EEEEEE',
    'border-radius': '6px',
    'padding': '0px'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
