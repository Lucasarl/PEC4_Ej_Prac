import { Component, input, output } from '@angular/core';
import { NgClass, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Article } from '../../../../shared/models/article.interface';
import { ArticleQuantityChange } from '../../../../shared/models/article-quantity-change.interface';
import { DefaultImagePipe } from '../../../../shared/pipes/default-image.pipe';

@Component({
  selector: 'app-article-item',
  imports: [NgClass, CurrencyPipe, DefaultImagePipe],
  templateUrl: './article-item.html',
  styleUrl: './article-item.css',
  // Removed OnPush for better reactivity with server updates
})
export class ArticleItem {
  article = input.required<Article>();
  quantityChange = output<ArticleQuantityChange>();

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/article', this.article().id]);
  }

  incrementQuantity(): void {
    console.log('Increment clicked for:', this.article().name, 'Current:', this.article().quantityInCart);
    this.quantityChange.emit({
      article: this.article(),
      quantity: this.article().quantityInCart + 1
    });
  }

  decrementQuantity(): void {
    console.log('Decrement clicked for:', this.article().name, 'Current:', this.article().quantityInCart);
    if (this.article().quantityInCart > 0) {
      this.quantityChange.emit({
        article: this.article(),
        quantity: this.article().quantityInCart - 1
      });
    }
  }
}
