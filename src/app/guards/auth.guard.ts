import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userStore: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userStore.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          console.log('Route access granted: User is authenticated');
          return true;
        } else {
          console.log('Route access denied: User not authenticated, redirecting to login');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}