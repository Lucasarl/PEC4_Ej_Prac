import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-article-new-template',
  imports: [FormsModule, NgIf],
  templateUrl: './article-new-template.html',
  styleUrl: './article-new-template.css',
})
export class ArticleNewTemplate {
  submitted = false;

  onSubmit(form: any): void {
    this.submitted = true;
    if (form.valid) {
      console.log('Formulario válido - Datos del artículo:', form.value.article);
      // Reset form after successful submission
      form.reset();
      this.submitted = false;
    } else {
      console.log('Formulario inválido');
    }
  }
}
