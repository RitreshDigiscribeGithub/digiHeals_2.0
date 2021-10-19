import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicTitleService {
  headerTitleSubject = new BehaviorSubject<string>('Dashboard');
  constructor(private _pageTitle: Title, private _metaData: Meta) {}

  private setPageTitle(param) {
    return this._pageTitle.setTitle(
      `${param == 'Page not found' ? '' : ''}  DigiHeals | ${param}`
    );
  }
  // TODO for root MetaData
  rootMetaData(Name: string, Content: string) {
    this._metaData.addTag({ name: Name, content: Content });
  }
  // TODO for each component update MetaData
  updateMetaData(Name: string, Content: string) {
    this._metaData.updateTag({ name: Name, content: Content });
  }

  setHeaderTitle(param) {
    this.headerTitleSubject.next(param);
    this.setPageTitle(param);
  }
}
