import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError,filter, finalize } from "rxjs/operators";
import {Partner} from '../models/partner';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  //Heading: helper variable and method
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  private _apiEndPoint: string = environment.apiEndpoint;
  private _apiEndPointPartner: string = environment.apiEndpointPartner;
  
  //Todo:object To Query String
  private objectToQueryString(obj: any): string {
    var str = [];
    for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
  }

  //Todo:CatchError
  private mapAndCatchError<TData>(response: Observable<ApiResponse<TData>>): Observable<ApiResponse<TData>>{
       return response.pipe(
        map((r: ApiResponse<TData>)=>{
          var result = new ApiResponse<TData>();
          Object.assign(result, r);
          this.setLoading(false);
          return result;
        }),
        catchError((err: HttpErrorResponse)=>{
          var result = new ApiResponse<TData>();
          console.log(err);
          if (err.error.type != "YourApiResponseType") {
            result.errors.push("Unknown error.");
          }else{
            Object.assign(result, err.error);
          }
          this.setLoading(false);
          return of(result);
        })
       )
  }
  //Todo:loading 
  public loading: Subject<boolean> = new BehaviorSubject<boolean>(false);
  get loading$() {
    return this.loading.asObservable();
  }

  setLoading(data: boolean) {
    this.loading.next(data);
  }
  
  //Heading: DI section
  constructor(private _http: HttpClient) {}

  //Heading: common http request
  makeHttpRequest<TData>({ method, url, data }: { method: string; url: string; data?: any; }): Observable<ApiResponse<TData>> {
    let finalUrl: string = this._apiEndPoint + url;
    let body: any = null;
    if (method.toUpperCase() == "GET") {
      if (data) {
        finalUrl += "?" + this.objectToQueryString(data);
      }
    } else {
      body = data;
    }
    this.setLoading(true);

    return this.mapAndCatchError<TData>(
      this._http
        .request<ApiResponse<TData>>(method.toUpperCase(), finalUrl, {
          body: body,
          headers: this.httpOptions.headers,
        })
        .pipe(finalize(() => this.setLoading(false)))
    );
  }

   //Heading: Auth http Request
  makeAuthRequest<TData>(method: string, url: string, data?: any, tokenPassed?: string): Observable<ApiResponse<TData>> {
    let finalUrl: string = this._apiEndPoint + url;
    let body: any = null;
    if (method.toUpperCase() == "GET") {
      if (data) {
        finalUrl += "?" + this.objectToQueryString(data);
      }
    } else {
      body = data;
    }
    const token = tokenPassed ? tokenPassed : localStorage.getItem("token-digiheals");

    this.setLoading(true);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      Accept: "application/json",
    });

    return this.mapAndCatchError<TData>(
      this._http
        .request<ApiResponse<TData>>(method.toUpperCase(), finalUrl, {
          body: body,
          headers: headers,
        })
        .pipe(finalize(() => this.setLoading(false)))
    );
  }
}

  //Heading: ApiResponse class
export class ApiResponse<T> {
  constructor() {
    this.errors = [];
  }
  // public string Type => "YourApiResponseType";
  data: T;
  errors: string[];
  status?:boolean;
  labPartner?:Array<Partner>;
  pharmacyPartner?:Array<Partner>;
  getErrorsText(): string {
    return this.errors.join(" ");
  }
  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

