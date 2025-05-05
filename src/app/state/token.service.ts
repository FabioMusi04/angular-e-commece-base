import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStore {
  private readonly _token = signal<string | null>(null);

  readonly token = computed(() => this._token());

  setToken(token: string) {
    this._token.set(token);
    localStorage.setItem('user_token', token);
  }

  clearToken() {
    this._token.set(null);
    localStorage.removeItem('user_token');
  }

  readonly isAuthenticated = computed(() => !!this._token());

  constructor() {
    const saved = localStorage.getItem('user_token');
    if (saved) {
      this._token.set(saved);
    }
  }
}
