import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleItem } from '../article-item/article-item';
import { Article } from '../../../../shared/models/article.interface';
import { ArticleQuantityChange } from '../../../../shared/models/article-quantity-change.interface';
import { ArticleService } from '../../services/article-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

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
      @if (articles$ | async; as articles) {
        @for (article of articles; track article.id) {
          <app-article-item 
            [article]="article" 
            (quantityChange)="onQuantityChange($event)">
          </app-article-item>
        }
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
  private localArticles = new BehaviorSubject<Article[]>([]);

  constructor(private articleService: ArticleService) {
    // Observable principal que combina datos del servidor con actualizaciones locales
    this.articles$ = this.localArticles.asObservable();
    
    // Observable para cargar datos del servidor
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.articleService.getArticles(query || undefined)),
      catchError(error => {
        console.error('Error loading articles:', error);
        return of([]);
      }),
      tap(articles => {
        console.log('Articles loaded from server:', articles);
        this.localArticles.next([...articles]);
      })
    ).subscribe();
  }

  ngOnInit(): void {
    // Cargar artículos iniciales
    this.searchSubject.next('');
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  onQuantityChange(change: ArticleQuantityChange): void {
    console.log('Quantity change received:', change);
    
    // 1. Actualizar inmediatamente en la vista local 
    const currentArticles = this.localArticles.getValue();
    const updatedArticles = currentArticles.map(article => 
      article.id === change.article.id 
        ? { ...article, quantityInCart: change.quantity }
        : article
    );
    this.localArticles.next(updatedArticles);
    console.log('Local update applied immediately');
    
    // 2. Sincronizar con el servidor en background
    const quantityDifference = change.quantity - change.article.quantityInCart;
    console.log('Syncing with server, difference:', quantityDifference);
    
    this.articleService.changeQuantity(change.article.id, quantityDifference).subscribe({
      next: (updatedArticle) => {
        console.log('Server sync completed:', updatedArticle);
      },
      error: (error) => {
        console.error('Error syncing with server:', error);
        // En caso de error, revertir el cambio local
        this.searchSubject.next(this.searchQuery || '');
      }
    });
  }
}
