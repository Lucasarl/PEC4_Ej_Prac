import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserStoreService, User } from '../../features/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;

  constructor(
    private userStore: UserStoreService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.userStore.isAuthenticated$;
    this.currentUser$ = this.userStore.currentUser$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.userStore.clearUser();
    this.router.navigate(['/login']);
  }
}
