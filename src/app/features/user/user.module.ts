import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { USER_ROUTES } from './user.routes';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(USER_ROUTES),
    Login,
    Register
  ],
  providers: []
})
export class UserModule {
  constructor() {
    console.log('UserModule loaded (lazy)');
  }
}