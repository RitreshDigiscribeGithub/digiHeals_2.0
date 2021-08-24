import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicTitleService {
  headerTitleSubject = new BehaviorSubject<string>("Wilsson Clinic Center");
  constructor() { }

  setHeaderTitle(param) {
    this.headerTitleSubject.next(param)
  }
}
