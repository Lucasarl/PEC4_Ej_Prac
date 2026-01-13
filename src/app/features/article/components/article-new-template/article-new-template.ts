import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-new-template',
  imports: [FormsModule, CommonModule],
  templateUrl: './article-new-template.html',
  styleUrl: './article-new-template.css',
})
export class ArticleNewTemplate {
  submitted = false;
  
  article = {
    name: '',
    price: 0,
    imageUrl: '',
    isOnSale: false
  };

  onSubmit(form: any): void {
    this.submitted = true;
    if (form.valid) {
      console.log('Formulario válido - Datos del artículo:', this.article);
      // Reset form after successful submission
      this.article = {
        name: '',
        price: 0,
        imageUrl: '',
        isOnSale: false
      };
      form.reset();
      this.submitted = false;
    } else {
      console.log('Formulario inválido');
    }
  }
}
