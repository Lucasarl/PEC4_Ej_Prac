import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Article } from '../../models/article.interface';

@Component({
  selector: 'app-article-item',
  imports: [NgClass],
  templateUrl: './article-item.html',
  styleUrl: './article-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleItem {
  article = signal<Article>({
    name: 'Mechanical Keyboard RGB Pro',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    price: 129.99,
    isOnSale: true,
    quantityInCart: 0
  });

  isDecrementDisabled = computed(() => this.article().quantityInCart === 0);

  incrementQuantity(): void {
    this.article.update(article => ({
      ...article,
      quantityInCart: article.quantityInCart + 1
    }));
  }

  decrementQuantity(): void {
    this.article.update(article => ({
      ...article,
      quantityInCart: Math.max(0, article.quantityInCart - 1)
    }));
  }
}
