import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import { LoginResponseContract } from '../contracts/LoginResContract';
import { RefreshTokenResContract } from '../contracts/RefreshTokenResContract';
import { LoginPayloadContract } from '../contracts/LoginReqContract';
import { Constant } from '../util/constant';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private usernameKey = 'username';
  private rolesKey='roles';
  private actionsKey='actions';


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
      let claims = this.getClaims(res.accessToken);
      localStorage.setItem(this.rolesKey,JSON.stringify(claims.roles));
      localStorage.setItem(this.actionsKey,JSON.stringify(claims.actions));
    })
  );
}

// ---- LOGOUT ----
logout() {
  const userName = localStorage.getItem(this.usernameKey);
  const token = this.getAccessToken();

  if (this.authState.value === false || userName === null || userName === undefined) return;  
  localStorage.clear();
  this.authState.next(false);
  this.http.get(Constant.LOGOUT_API+userName, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  })
  this.router.navigate(['/login']);
}

// ---- REFRESH TOKEN ----
refreshAccessToken(): Observable<string> {
  const refreshToken = this.getRefreshToken();
  return this.http
    .post<RefreshTokenResContract>(Constant.REFRESH_TOKEN_API, {refreshToken: refreshToken })
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
getRoles(): string[] {
  const roles = localStorage.getItem(this.rolesKey);

  try {
    return roles ? JSON.parse(roles) as string[] : [];
  } catch (error) {
    console.warn('Invalid roles data in localStorage:', roles, error);
    return roles ? roles.split(',') : [];
  }
}

getActions(): string[] {
  const actions = localStorage.getItem(this.actionsKey);

  try {
    return actions ? JSON.parse(actions) as string[] : [];
  } catch (error) {
    console.warn('Invalid actions data in localStorage:', actions, error);
    return actions ? actions.split(',') : [];
  }
}

getClaims(token: string): any {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
}

private clearTokens() {
  localStorage.removeItem(this.accessTokenKey);
  localStorage.removeItem(this.refreshTokenKey);
}

}
