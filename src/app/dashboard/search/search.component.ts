import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit {
  constructor(private _dynamicTitleService: DynamicTitleService) {}
  recommendation = [
    {
      heading: 'top doctor',
      list: [
        'General Medicine',
        'Cardiologist',
        'Heart Surgeon',
        'Eye Specialist',
      ],
    },
    {
      heading: 'Top Medicines',
      list: ['Methotrexate', 'Pantoprazole', 'Cyclobenzaprine'],
    },
    {
      heading: 'Top Diagnostic Test',
      list: ['OH Progesterone', 'Blood Cloat Test'],
    },
  ];

  ngOnInit(): void {
    this._dynamicTitleService.setHeaderTitle('search');
  }
}
