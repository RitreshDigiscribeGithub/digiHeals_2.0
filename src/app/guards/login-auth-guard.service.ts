import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment,
  CanLoad,
  ActivatedRoute,
} from "@angular/router";
import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

import { Observable } from "rxjs";

@Injectable()
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    
    const token = localStorage.getItem("clinicCode") || localStorage.getItem("selectedPatient");

    if (token) {
        return true;
      } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    
  }
}
