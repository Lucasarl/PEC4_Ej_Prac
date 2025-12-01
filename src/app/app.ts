import { Component, signal } from '@angular/core';
import { ArticleItem } from './components/article-item/article-item';

@Component({
  selector: 'app-root',
  imports: [ArticleItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
}
