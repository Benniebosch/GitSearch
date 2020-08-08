import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
//import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    //private auth: AuthenticationService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //  if (!this.authService.isLoggedIn) {
    //    this.router.navigate(['/']);
    //    return false;
    //  }
    //  return true;

    return this.authService.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.authService.login(state.url);
        }
      })
    );
  }
}
