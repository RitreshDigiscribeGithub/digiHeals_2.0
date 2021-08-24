import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-your-address',
  templateUrl: './your-address.component.html',
  styleUrls: ['./your-address.component.less']
})
export class YourAddressComponent implements OnInit {
  address_list = [
    {
      heading: 'Esther Howard',
      address: `4140 Parker Rd. Allentown, New Mexico Sion West, Mumbai - 400022 Maharastra, India`
    },
    {
      heading: 'Esther Howard',
      address: `4140 Parker Rd. Allentown, New Mexico Sion West, Mumbai - 400022 Maharastra, India`
    },
    {
      heading: 'Esther Howard',
      address: `4140 Parker Rd. Allentown, New Mexico Sion West, Mumbai - 400022 Maharastra, India`
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
  value = ''
  getValue(value) {
    this.value = value;
  }
}
