import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  toggleSubject = new BehaviorSubject<boolean>(false)
  constructor() { }
}
