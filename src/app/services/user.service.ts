import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    username: string;
  };
}

export interface RegisterRequest {
  username: string;
}

export interface RegisterResponse {
  message: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/user';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Autentica un usuario en el sistema
   * @param username Nombre de usuario
   * @param password Contraseña del usuario
   * @returns Observable con la respuesta del login
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { username, password };
    
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`, 
      loginData, 
      this.httpOptions
    );
  }

  /**
   * Registra un nuevo usuario en el sistema
   * @param username Nombre de usuario a registrar
   * @returns Observable con la respuesta del registro
   */
  register(username: string): Observable<RegisterResponse> {
    const registerData: RegisterRequest = { username };
    
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register`, 
      registerData, 
      this.httpOptions
    );
  }
}