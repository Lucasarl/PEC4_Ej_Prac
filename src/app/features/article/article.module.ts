import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { ARTICLE_ROUTES } from './article.routes';
import { ArticleList } from './components/article-list/article-list';
import { ArticleDetail } from './components/article-detail/article-detail';
import { ArticleNewReactive } from './components/article-new-reactive/article-new-reactive';
import { ArticleItem } from './components/article-item/article-item';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    RouterModule.forChild(ARTICLE_ROUTES),
    // Standalone components are imported in routes, not here
    ArticleList,
    ArticleDetail,
    ArticleNewReactive,
    ArticleItem
  ],
  providers: []
})
export class ArticleModule {
  constructor() {
    console.log('ArticleModule loaded (lazy)');
  }
}