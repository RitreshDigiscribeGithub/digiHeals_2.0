import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'digi-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.less']
})
export class AddAddressComponent implements OnInit {
  @Output() public close = new EventEmitter<boolean>()
  checked = false;

  states: any[] = [
    { state: "Andaman and Nicobar Islands" },
    { state: "Andhra Pradesh" },
    { state: "Arunachal Pradesh" },
    { state: "Assam" },
    { state: "Bihar" },
    { state: "Chandigarh" },
    { state: "Chhattisgarh" },
    { state: "Dadra and Nagar Haveli" },
    { state: "Daman and Diu" },
    { state: "Delhi" },
    { state: "Goa" },
    { state: "Gujarat" },
    { state: "Haryana" },
    { state: "Himachal Pradesh" },
    { state: "Jammu and Kashmir" },
    { state: "Jharkhand" },
    { state: "Karnataka" },
    { state: "Kerala" },
    { state: "Ladakh" },
    { state: "Lakshadweep" },
    { state: "Madhya Pradesh" },
    { state: "Maharashtra" },
    { state: "Manipur" },
    { state: "Meghalaya" },
    { state: "Mizoram" },
    { state: "Nagaland" },
    { state: "Odisha" },
    { state: "Puducherry" },
    { state: "Punjab" },
    { state: "Rajasthan" },
    { state: "Sikkim" },
    { state: "Tamil Nadu" },
    { state: "Telangana" },
    { state: "Tripura" },
    { state: "Uttar Pradesh" },
    { state: "Uttarakhand" },
    { state: "West Bengal" }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.close.emit(false)
  }
}
