import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
  ActivatedRoute,
} from "@angular/router";
import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  redirectUrl:string;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivateChild(route, state);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // return true;
    
    
    const token = localStorage.getItem("token-digiheals");
    if (token) {
      return true;  
    } else {
      this.router.navigate(['/auth/login']);
      this.redirectUrl = state.url;
      return false
    }
  }

  constructor(
    private router: Router
  ) {}
}
