import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaControlService {
  winMedia = window.matchMedia('(max-width: 768px)').matches;
  constructor() {}
  // this.winMedia
  mediaPort(): boolean {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return true;
    } else {
      return false;
    }
  }
  mediaNumber(lessNum, greaterNum): number {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return lessNum;
    } else {
      return greaterNum;
    }
  }
}
// '(max-width: 991px)'
