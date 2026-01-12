import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ArticleList } from './components/article-list/article-list';
import { ArticleNewReactive } from './components/article-new-reactive/article-new-reactive';
import { ArticleDetail } from './components/article-detail/article-detail';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Ruta por defecto redirige a login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Rutas de autenticación
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  
  // Rutas de artículos
  { path: 'article/list', component: ArticleList },
  { 
    path: 'article/create', 
    component: ArticleNewReactive,
    canActivate: [AuthGuard] // Ruta protegida
  },
  { path: 'article/:id', component: ArticleDetail },
  
  // Ruta para casos no encontrados
  { path: '**', redirectTo: '/login' }
];