import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleItem } from '../article-item/article-item';
import { Article } from '../../models/article.interface';
import { ArticleQuantityChange } from '../../models/article-quantity-change.interface';
import { ArticleService } from '../../services/article-service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  imports: [ArticleItem, CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <input 
        type="text" 
        [(ngModel)]="searchQuery"
        (ngModelChange)="onSearchChange($event)"
        placeholder="Buscar artículos por nombre..."
        class="search-input">
    </div>
    <div class="article-list">
      @for (article of (articles$ | async) ?? []; track article.id) {
        <app-article-item 
          [article]="article" 
          (quantityChange)="onQuantityChange($event)">
        </app-article-item>
      }
    </div>
  `,
  styles: `
    .search-container {
      padding: 1rem 2rem;
      display: flex;
      justify-content: center;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .article-list {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem;
    }
  `,
})
export class ArticleList implements OnInit {
  articles$: Observable<Article[]>;
  searchQuery = '';
  private searchSubject = new BehaviorSubject<string>('');

  constructor(private articleService: ArticleService) {
    this.articles$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.articleService.getArticles(query || undefined))
    );
  }

  ngOnInit(): void {
    // Cargar artículos iniciales
    this.searchSubject.next('');
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  onQuantityChange(change: ArticleQuantityChange): void {
    const quantityDifference = change.quantity - change.article.quantityInCart;
    this.articleService.changeQuantity(change.article.id, quantityDifference).subscribe({
      next: () => {
        // Recargar la lista para obtener datos actualizados del servidor
        this.searchSubject.next(this.searchQuery);
      },
      error: (error) => {
        console.error('Error changing quantity:', error);
      }
    });
  }
}
