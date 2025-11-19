import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginModel {
  tenDangNhap: string;
  matKhau: string;
  idVaiTro: number;
  token?: string;
  data?: {
    id: number;
    hoTen: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_info';
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  private currentUserSubject = new BehaviorSubject<LoginModel | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(loginModel: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.apiUrl}/Login`, loginModel).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
          if (response.data) {
            this.saveUserInfo(response);
          }
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  saveUserInfo(user: LoginModel): void {
    if (this.isBrowser) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  getUserInfo(): LoginModel | null {
    if (!this.isBrowser) return null;

    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;

    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  hasRole(role: string): boolean {
    const user = this.getUserInfo();
    return user?.data?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getUserInfo();
    return user ? roles.includes(user.data?.role || '') : false;
  }
}

