import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Article } from '../../models/article.interface';
import { ArticleQuantityChange } from '../../models/article-quantity-change.interface';

@Component({
  selector: 'app-article-item',
  imports: [NgClass],
  templateUrl: './article-item.html',
  styleUrl: './article-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleItem {
  article = input.required<Article>();
  quantityChange = output<ArticleQuantityChange>();

  incrementQuantity(): void {
    this.quantityChange.emit({
      article: this.article(),
      quantity: this.article().quantityInCart + 1
    });
  }

  decrementQuantity(): void {
    if (this.article().quantityInCart > 0) {
      this.quantityChange.emit({
        article: this.article(),
        quantity: this.article().quantityInCart - 1
      });
    }
  }
}
