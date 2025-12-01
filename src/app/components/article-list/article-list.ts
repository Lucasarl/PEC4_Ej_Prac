import { Component, signal } from '@angular/core';
import { ArticleItem } from '../article-item/article-item';
import { Article } from '../../models/article.interface';
import { ArticleQuantityChange } from '../../models/article-quantity-change.interface';

@Component({
  selector: 'app-article-list',
  imports: [ArticleItem],
  template: `
    <div class="article-list">
      @for (article of articles(); track article.id) {
        <app-article-item 
          [article]="article" 
          (quantityChange)="onQuantityChange($event)">
        </app-article-item>
      }
    </div>
  `,
  styles: `
    .article-list {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem;
    }
  `,
})
export class ArticleList {
  articles = signal<Article[]>([
    {
      id: 1,
      name: 'Wireless Gaming Mouse',
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      price: 79.99,
      isOnSale: true,
      quantityInCart: 0
    },
    {
      id: 2,
      name: 'USB-C Hub Adapter',
      imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
      price: 49.99,
      isOnSale: true,
      quantityInCart: 0
    },
    {
      id: 3,
      name: 'Noise Cancelling Headphones',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      price: 199.99,
      isOnSale: false,
      quantityInCart: 0
    }
  ]);

  onQuantityChange(change: ArticleQuantityChange): void {
    this.articles.update(articles => 
      articles.map(article => 
        article.id === change.article.id 
          ? { ...article, quantityInCart: change.quantity }
          : article
      )
    );
  }
}
