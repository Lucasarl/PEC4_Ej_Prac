import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';
import { ArticleDetail } from './components/article-detail/article-detail';
import { ArticleNewReactive } from './components/article-new-reactive/article-new-reactive';
import { AuthGuard } from '../../shared/guards/auth.guard';

export const ARTICLE_ROUTES: Routes = [
  { 
    path: '', 
    redirectTo: '/list', 
    pathMatch: 'full' 
  },
  { 
    path: 'list', 
    component: ArticleList,
    title: 'Articles - Ecommerce'
  },
  { 
    path: 'create', 
    component: ArticleNewReactive,
    canActivate: [AuthGuard],
    title: 'Create Article - Ecommerce'
  },
  { 
    path: ':id', 
    component: ArticleDetail,
    title: 'Article Details - Ecommerce'
  }
];