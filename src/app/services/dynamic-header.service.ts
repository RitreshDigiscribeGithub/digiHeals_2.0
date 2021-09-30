import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicHeaderService {

  title = new BehaviorSubject('Dashboard');

  setTitle(title: string) {
    this.title.next(title);
  }
}


