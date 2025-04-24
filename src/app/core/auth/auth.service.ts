import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStore } from '../../state/token.service'; // <-- Add this
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl; // Replace with your API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private tokenStore: TokenStore // <-- Add this
  ) {
    this.checkAuthStatus();
  }

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<object> {
    return this.http.post<object>(`${this.API_URL}/auth/register`, user).pipe(
      tap({
        next: (response) => {
          if (response) {
            console.log('Registration successful:', response);
          }
        },
        error: (error) => {
          if (error.status === 400) {
            console.error('Bad request:', error.error);
          }
        },
      }),
      map((response) => response)
    );
  }

  login(credentials: { email: string; password: string }): Observable<object> {
    const headers = {
      Authorization:
        'Basic ' + btoa(`${credentials.email}:${credentials.password}`),
    };
    return this.http
      .post<{ token: string; user: object }>(
        `${this.API_URL}/auth`,
        {},
        { headers }
      )
      .pipe(
        tap((response) => {
          if (response.token) {
            this.tokenStore.setToken(response.token);
            this.isAuthenticatedSubject.next(true);
          }
        }),
        map((response) => response.user)
      );
  }

  logout(): void {
    this.tokenStore.clearToken(); // <-- Updated line
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenStore.token(); // <-- Reactive read
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  private checkAuthStatus(): void {
    const isAuthenticated = this.isLoggedIn();
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getCurrentUser(): string | null {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  canMatch(): Observable<boolean> {
    return this.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
        return isAuthenticated;
      })
    );
  }
}
