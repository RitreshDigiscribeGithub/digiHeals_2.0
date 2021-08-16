import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicTitleService {
  headerTitleSubject = new Subject<string>();
  constructor() { }

  setHeaderTitle(param) {
    this.headerTitleSubject.next(param)
  }
}
