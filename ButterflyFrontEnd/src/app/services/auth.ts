import { Injectable, signal } from '@angular/core';

export interface AuthUser {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isAuthenticated = signal(false);
  private readonly _user = signal<AuthUser | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /** Credenciales simuladas para validación local */
  private readonly mockCredentials = {
    email: 'admin@butterfly.com',
    password: 'butterfly2026',
  };

  /** Verifica si hay una sesión persistente al cargar la app */
  constructor() {
    this.checkSession();
  }

  private checkSession(): void {
    const session = localStorage.getItem('butterfly_admin_session');
    if (session) {
      try {
        const user = JSON.parse(session) as AuthUser;
        this._user.set(user);
        this._isAuthenticated.set(true);
      } catch {
        localStorage.removeItem('butterfly_admin_session');
      }
    }
  }

  login(email: string, password: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);

    // Simular latencia de red
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          email.toLowerCase() === this.mockCredentials.email &&
          password === this.mockCredentials.password
        ) {
          const user: AuthUser = {
            email: this.mockCredentials.email,
            name: 'Admin',
          };
          this._user.set(user);
          this._isAuthenticated.set(true);
          localStorage.setItem('butterfly_admin_session', JSON.stringify(user));
          this._loading.set(false);
          resolve(true);
        } else {
          this._error.set('Credenciales incorrectas. Intenta de nuevo.');
          this._loading.set(false);
          resolve(false);
        }
      }, 800);
    });
  }

  logout(): void {
    this._isAuthenticated.set(false);
    this._user.set(null);
    this._error.set(null);
    localStorage.removeItem('butterfly_admin_session');
  }
}
