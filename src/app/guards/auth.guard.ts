import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Services
import { UsuarioService } from '../core/services/usuario.service';
import { LoadingService } from '../core/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router        : Router,
    private usuarioService: UsuarioService,
    private loadingService: LoadingService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    
    this.loadingService.loading.emit(true);

    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
      this.loadingService.loading.emit(false);
      return false;
    }
    return this.usuarioService.getParticipante()
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('/login');
          return of(null);
        })
      )
  }

}
