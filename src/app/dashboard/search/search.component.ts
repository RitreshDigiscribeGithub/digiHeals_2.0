import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  constructor() { }
  recommendation = [
    {
      heading: 'top doctor',
      list: ['General Medicine', 'Cardiologist', 'Heart Surgeon', 'Eye Specialist']
    },
    {
      heading: 'Top Medicines',
      list: ['Methotrexate', 'Pantoprazole', 'Cyclobenzaprine']
    },
    {
      heading: 'Top Diagnostic Test',
      list: ['OH Progesterone', 'Blood Cloat Test']
    }
  ]

  ngOnInit(): void {
  }

}
