import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  coordinates: any;

  constructor() { }

  public getPosition(): Observable<any> {
    return Observable.create(
      (observer) => {

        navigator.geolocation.getCurrentPosition((position) => {
          observer.next(position);
        }),
      // navigator.geolocation.watchPosition((pos: any) => {
      //   observer.next(pos);
      // }),
      () => {
          console.log('Position is not available');
      },
      {
        enableHighAccuracy: true ,
        timeout:10000 };
    });
  }

}

