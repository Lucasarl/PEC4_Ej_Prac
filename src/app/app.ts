import { Component, signal } from '@angular/core';
import { ArticleList } from './components/article-list/article-list';

@Component({
  selector: 'app-root',
  imports: [ArticleList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
}
