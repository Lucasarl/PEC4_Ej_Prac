import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  loginError = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';
      
      const { username, password } = this.loginForm.value;
      
      // Timeout de 10 segundos
      const loginTimeout = setTimeout(() => {
        this.loginError = 'Request timeout. Please check your connection and try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 10000);
      
      this.userService.login(username, password).subscribe({
        next: (response) => {
          clearTimeout(loginTimeout);
          console.log('Login successful:', response);
          this.userStore.setUser(response.user, response.token);
          this.router.navigate(['/article/list']);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          clearTimeout(loginTimeout);
          console.error('Login error:', error);
          this.loginError = error.error?.error || 'Login failed. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}