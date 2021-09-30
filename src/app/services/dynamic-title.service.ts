import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DynamicTitleService {

  constructor(private _pageTitle: Title, private _metaData: Meta) { }
  setPageTitle(param) {
    return this._pageTitle.setTitle(`${(param == 'Page not found') ? '' : ''}  ${param}`)
  }
  // TODO for root MetaData
  rootMetaData(Name: string, Content: string) {
    this._metaData.addTag(
      { name: Name, content: Content }
    )
  }
  // TODO for each component update MetaData
  updateMetaData(Name: string, Content: string) {
    this._metaData.updateTag({ name: Name, content: Content })
  }
}
