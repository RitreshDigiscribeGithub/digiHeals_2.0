import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTitleService } from '../shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router, private _dynamicTitleService: DynamicTitleService, private _cdRef: ChangeDetectorRef) { }

  title = null;

  ngOnInit(): void {
   
  }
}
