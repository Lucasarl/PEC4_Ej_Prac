import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NameArticleValidator } from '../../../../shared/validators/name-article.validator';
import { ArticleService } from '../../services/article-service';
import { Article } from '../../../../shared/models/article.interface';

@Component({
  selector: 'app-article-new-reactive',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './article-new-reactive.html',
  styleUrl: './article-new-reactive.css',
})
export class ArticleNewReactive {
  articleForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, NameArticleValidator()]],
      price: [0, [Validators.required, Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}.*')]],
      isOnSale: [false]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.articleForm.valid) {
      const newArticle: Article = {
        id: 0, // El servicio asignará el ID
        name: this.articleForm.value.name,
        price: this.articleForm.value.price,
        imageUrl: this.articleForm.value.imageUrl,
        isOnSale: this.articleForm.value.isOnSale,
        quantityInCart: 0
      };
      
      this.articleService.create(newArticle).subscribe({
        next: () => {
          console.log('Artículo creado exitosamente');
          this.articleForm.reset({ name: '', price: 0, imageUrl: '', isOnSale: false });
          this.submitted = false;
        },
        error: (error) => {
          console.error('Error al crear artículo:', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  get name() { return this.articleForm.get('name'); }
  get price() { return this.articleForm.get('price'); }
  get imageUrl() { return this.articleForm.get('imageUrl'); }
  get isOnSale() { return this.articleForm.get('isOnSale'); }
}
