import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/api/articles';

  constructor(private http: HttpClient) {}

  getArticles(searchQuery?: string): Observable<Article[]> {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.set('q', searchQuery);
    }
    return this.http.get<Article[]>(this.apiUrl, { params });
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    return this.http.patch<Article>(`${this.apiUrl}/${articleID}`, {
      changeInQuantity: changeInQuantity
    });
  }

  create(article: Article): Observable<any> {
    const articleData = {
      name: article.name,
      imageUrl: article.imageUrl,
      price: article.price,
      isOnSale: article.isOnSale
    };
    return this.http.post<Article>(this.apiUrl, articleData);
  }
}