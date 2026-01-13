import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta por defecto redirige a login
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  
  // Lazy loading para el módulo User
  { 
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
  },
  
  // Lazy loading para el módulo Article
  { 
    path: 'article',
    loadChildren: () => import('./features/article/article.module').then(m => m.ArticleModule)
  },
  
  // Backwards compatibility routes (redirect to new structure)
  { path: 'login', redirectTo: '/user/login' },
  { path: 'register', redirectTo: '/user/register' },
  
  // Ruta para casos no encontrados
  { path: '**', redirectTo: '/user/login' }
];