import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { ArticleList } from './components/article-list/article-list';
import { ArticleNewTemplate } from './components/article-new-template/article-new-template';
import { ArticleNewReactive } from './components/article-new-reactive/article-new-reactive';

@Component({
  selector: 'app-root',
  imports: [Navbar, ArticleList, ArticleNewTemplate, ArticleNewReactive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
  currentView = signal<string>('home');

  onViewChange(view: string): void {
    this.currentView.set(view);
  }
}
