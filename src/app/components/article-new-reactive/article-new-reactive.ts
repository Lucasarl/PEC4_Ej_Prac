import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NameArticleValidator } from '../../validators/name-article.validator';

@Component({
  selector: 'app-article-new-reactive',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './article-new-reactive.html',
  styleUrl: './article-new-reactive.css',
})
export class ArticleNewReactive {
  articleForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
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
      console.log('Formulario válido - Datos del artículo:', this.articleForm.value);
      this.articleForm.reset({ name: '', price: 0, imageUrl: '', isOnSale: false });
      this.submitted = false;
    } else {
      console.log('Formulario inválido');
    }
  }

  get name() { return this.articleForm.get('name'); }
  get price() { return this.articleForm.get('price'); }
  get imageUrl() { return this.articleForm.get('imageUrl'); }
  get isOnSale() { return this.articleForm.get('isOnSale'); }
}
