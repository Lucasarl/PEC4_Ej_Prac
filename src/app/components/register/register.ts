import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  registerError = '';
  registerSuccess = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      confirmUsername: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, confirmUsername } = this.registerForm.value;
      
      if (username !== confirmUsername) {
        this.registerError = 'Username confirmation does not match';
        return;
      }

      this.isLoading = true;
      this.registerError = '';
      this.registerSuccess = '';
      
      // Agregar timeout de 10 segundos
      const registerTimeout = setTimeout(() => {
        this.registerError = 'Request timeout. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 10000);
      
      this.userService.register(username).subscribe({
        next: (response) => {
          clearTimeout(registerTimeout);
          console.log('Registration successful:', response);
          this.registerSuccess = 'Registration successful! You can now login with password "SECRET"';
          this.isLoading = false;
          this.cdr.detectChanges();
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          clearTimeout(registerTimeout);
          console.error('Registration error:', error);
          this.registerError = error.error?.error || 'Registration failed. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  get username() { return this.registerForm.get('username'); }
  get confirmUsername() { return this.registerForm.get('confirmUsername'); }
}