import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService

  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    return this.authService.getCurrentUser()
      .pipe(
        map((user: any) => {
          if (!user.emailVerified) {
            this.router.navigateByUrl('/login');
          } else {
            return true;
          }
        }),
        catchError(() => {
          this.router.navigateByUrl('/login');
          return of(null);
        })
      )
  }

}
