import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const USER_ROUTES: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: Login,
    title: 'Login - Ecommerce'
  },
  { 
    path: 'register', 
    component: Register,
    title: 'Register - Ecommerce'
  }
];