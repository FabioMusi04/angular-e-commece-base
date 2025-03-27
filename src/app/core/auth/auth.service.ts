import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl; // Replace with your API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.checkAuthStatus();
  }

  login(credentials: { email: string; password: string }): Observable<object> {
    return this.http.post<{ token: string; user: object }>(`${this.API_URL}/auth`, credentials).pipe(
      tap((response) => {
      if (response.token) {
        localStorage.setItem('access_token', response.token);
        this.isAuthenticatedSubject.next(true);
      }
      }),
      map((response) => response.user)
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
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
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
        return isAuthenticated;
      })
    );
  }
}