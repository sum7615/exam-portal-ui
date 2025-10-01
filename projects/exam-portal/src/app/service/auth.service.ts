import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import { LoginResponseContract } from '../contracts/LoginResContract';
import { RefreshTokenResContract } from '../contracts/RefreshTokenResContract';
import { LoginPayloadContract } from '../contracts/LoginReqContract';
import { Constant } from '../util/constant';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private usernameKey = 'username';

  // 🔑 Emits login state changes to the whole app
  private authState = new BehaviorSubject<boolean>(this.hasAccessToken());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private router:Router) {}
// ---- LOGIN ----
login(data:LoginPayloadContract):Observable<LoginResponseContract> {
  return this.http.post<LoginResponseContract>(Constant.LOGIN_API, data).pipe(
    tap((res) => {
      this.storeTokens(res.accessToken, res.refreshToken);
      localStorage.setItem(this.usernameKey, data.username);
      this.authState.next(true);
    })
  );
}

// ---- LOGOUT ----
logout() {
  const userName = localStorage.getItem(this.usernameKey);
  if (this.authState.value === false || userName === null || userName === undefined) return;  this.clearTokens();
  this.authState.next(false);
  this.http.get(Constant.LOGOUT_API+userName).subscribe();
  this.router.navigate(['/login']);
}

// ---- REFRESH TOKEN ----
refreshAccessToken(): Observable<string> {
  const refreshToken = this.getRefreshToken();
  return this.http
    .post<RefreshTokenResContract>(Constant.REFRESH_TOKEN_API, { refreshToken })
    .pipe(
      tap((res) => this.storeTokens(res.accessToken, res.refreshToken)),
      map((res) => res.accessToken)
    );
}


// ---- HELPERS ----
getAccessToken() {
  return localStorage.getItem(this.accessTokenKey);
}
getUsername() {
  return localStorage.getItem(this.usernameKey);
}

getRefreshToken() {
  return localStorage.getItem(this.refreshTokenKey);
}

hasAccessToken(): boolean {
  return !!this.getAccessToken();
}

private storeTokens(access: string, refresh: string) {
  localStorage.setItem(this.accessTokenKey, access);
  localStorage.setItem(this.refreshTokenKey, refresh);
}

private clearTokens() {
  localStorage.removeItem(this.accessTokenKey);
  localStorage.removeItem(this.refreshTokenKey);
}

}
