import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '../shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  navTitle = ''
  constructor(
    private _dynamicTitle: DynamicTitleService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setHeaderTitle()
  }
  
  setHeaderTitle() {
    this._dynamicTitle.headerTitleSubject
      .subscribe(out => {
        this.navTitle = out;
        this._cdRef.detectChanges()
      })
  }
}
