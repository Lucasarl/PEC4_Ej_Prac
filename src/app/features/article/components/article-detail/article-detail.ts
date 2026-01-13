import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article-service';
import { Article } from '../../../../shared/models/article.interface';
import { DefaultImagePipe } from '../../../../shared/pipes/default-image.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DefaultImagePipe],
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.css']
})
export class ArticleDetail implements OnInit, OnDestroy {
  article: Article | null = null;
  isLoading = false;
  error = '';
  private paramSubscription?: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ArticleDetail ngOnInit called');
    
    // Subscribe to route param changes to handle navigation between different articles
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log('Route param changed, id:', idParam);
      
      if (idParam) {
        const articleId = parseInt(idParam, 10);
        console.log('Loading article ID:', articleId);
        this.loadArticleDetail(articleId);
      } else {
        console.log('No valid article ID found');
        this.error = 'Invalid article ID';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  private loadArticleDetail(articleId: number): void {
    // Reset all state
    this.isLoading = true;
    this.error = '';
    this.article = null;
    
    console.log('Starting to load article with ID:', articleId);
    
    // Timeout de 10 segundos y mejor manejo
    const loadTimeout = setTimeout(() => {
      console.log('Timeout reached for article loading');
      this.error = 'Loading timeout. Please try again.';
      this.isLoading = false;
    }, 10000);
    
    // Como no hay endpoint específico para un artículo, cargamos todos y filtramos
    const subscription = this.articleService.getArticles().subscribe({
      next: (articles) => {
        console.log('HTTP request completed, articles received:', articles?.length || 0);
        clearTimeout(loadTimeout);
        
        if (!articles || articles.length === 0) {
          console.log('No articles found in response');
          this.error = 'No articles found';
          this.isLoading = false;
          return;
        }
        
        const foundArticle = articles.find(a => a.id === articleId);
        console.log('Searching for article with ID:', articleId, 'in', articles.length, 'articles');
        
        if (foundArticle) {
          this.article = foundArticle;
          console.log('Article found and assigned:', foundArticle.name);
        } else {
          this.error = `Article with ID ${articleId} not found`;
          console.log('Article not found in list, available IDs:', articles.map(a => a.id));
        }
        
        console.log('Setting isLoading to false');
        this.isLoading = false;
        
        // Force change detection
        this.cdr.detectChanges();
        console.log('Change detection triggered');
      },
      error: (error) => {
        console.error('HTTP Error occurred:', error);
        clearTimeout(loadTimeout);
        this.error = 'Failed to load article. Please check if the server is running.';
        this.isLoading = false;
        
        // Force change detection on error too
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('HTTP request completed (complete callback)');
      }
    });
    
    // Add subscription cleanup
    console.log('HTTP subscription created');
  }

  increaseQuantity(): void {
    if (this.article) {
      this.articleService.changeQuantity(this.article.id, 1).subscribe({
        next: (updatedArticle) => {
          console.log('Quantity increased:', updatedArticle);
          if (this.article) {
            this.article.quantityInCart = updatedArticle.quantityInCart;
          }
        },
        error: (error) => {
          console.error('Error increasing quantity:', error);
        }
      });
    }
  }

  decreaseQuantity(): void {
    if (this.article && this.article.quantityInCart > 0) {
      this.articleService.changeQuantity(this.article.id, -1).subscribe({
        next: (updatedArticle) => {
          console.log('Quantity decreased:', updatedArticle);
          if (this.article) {
            this.article.quantityInCart = updatedArticle.quantityInCart;
          }
        },
        error: (error) => {
          console.error('Error decreasing quantity:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/article/list']);
  }

  retryLoad(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const articleId = parseInt(idParam, 10);
      this.loadArticleDetail(articleId);
    }
  }
}