import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  public readonly authState$ = this.authStateSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Cargar estado de autenticación desde localStorage al inicializar (solo en el browser)
    if (isPlatformBrowser(this.platformId)) {
      this.loadAuthStateFromStorage();
    }
  }

  /**
   * Obtiene el estado actual de autenticación
   */
  getCurrentAuthState(): AuthState {
    return this.authStateSubject.getValue();
  }

  /**
   * Observable que indica si el usuario está autenticado
   */
  get isAuthenticated$(): Observable<boolean> {
    return new Observable(observer => {
      this.authState$.subscribe(state => {
        observer.next(state.isAuthenticated);
      });
    });
  }

  /**
   * Observable con los datos del usuario actual
   */
  get currentUser$(): Observable<User | null> {
    return new Observable(observer => {
      this.authState$.subscribe(state => {
        observer.next(state.user);
      });
    });
  }

  /**
   * Obtiene el token de autenticación actual
   */
  getToken(): string | null {
    return this.authStateSubject.getValue().token;
  }

  /**
   * Establece el usuario y token después del login
   * @param user Datos del usuario
   * @param token Token de autenticación
   */
  setUser(user: User, token: string): void {
    const newState: AuthState = {
      isAuthenticated: true,
      user,
      token
    };

    // Guardar en localStorage solo si estamos en el browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    // Actualizar estado reactivo
    this.authStateSubject.next(newState);
    
    console.log('User authenticated and stored:', user);
  }

  /**
   * Limpia la sesión del usuario (logout)
   */
  clearUser(): void {
    // Limpiar localStorage solo si estamos en el browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }

    // Resetear estado
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });

    console.log('User session cleared');
  }

  /**
   * Verifica si el usuario está autenticado (sincronamente)
   */
  isAuthenticated(): boolean {
    return this.authStateSubject.getValue().isAuthenticated;
  }

  /**
   * Carga el estado de autenticación desde localStorage
   * (usado al inicializar la app para recordar login)
   */
  private loadAuthStateFromStorage(): void {
    // Solo ejecutar si estamos en el browser
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server, skipping localStorage access');
      return;
    }

    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userJson = localStorage.getItem(this.USER_KEY);

      if (token && userJson) {
        const user: User = JSON.parse(userJson);
        
        const authState: AuthState = {
          isAuthenticated: true,
          user,
          token
        };

        this.authStateSubject.next(authState);
        console.log('Auth state restored from localStorage:', user);
      }
    } catch (error) {
      console.error('Error loading auth state from localStorage:', error);
      // En caso de error, resetear estado sin llamar clearUser para evitar recursion
      this.authStateSubject.next({
        isAuthenticated: false,
        user: null,
        token: null
      });
    }
  }
}