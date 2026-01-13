import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from '../features/user/services/user-store.service';

@Injectable()
export class ArticleAppInterceptor implements HttpInterceptor {

  constructor(private userStore: UserStoreService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token de autenticación
    const token = this.userStore.getToken();
    
    // Si existe token, agregarlo a los headers
    if (token) {
      console.log('Adding auth token to request:', request.url);
      
      const authenticatedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return next.handle(authenticatedRequest);
    } else {
      // Si no hay token, enviar la request original
      console.log('No auth token found for request:', request.url);
      return next.handle(request);
    }
  }
}