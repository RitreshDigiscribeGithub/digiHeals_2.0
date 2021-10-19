import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTitleService } from '../shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _router: Router,
    public _cdRef: ChangeDetectorRef,
    private _dynamicTitleService: DynamicTitleService
  ) {}

  title = '';

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.setHeaderTitle();
  }

  setHeaderTitle() {
    this._dynamicTitleService.headerTitleSubject.subscribe((title) => {
      this.title = title;
      this._cdRef.detectChanges();
    });
  }
}
