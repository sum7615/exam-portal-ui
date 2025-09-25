import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api'; // Spring Boot API URL

  constructor(private http: HttpClient) {}

  // Call Public API (No authentication needed)
  getPublicData(): Observable<string> {
    return this.http.get(`${this.apiUrl}/public`, { responseType: 'text' });
  }

  // Call Private API (Requires Authentication)
  getPrivateData(): Observable<string> {
    return this.http.get(`${this.apiUrl}/private`, { responseType: 'text', withCredentials: true });
  }

  // Redirect to GitHub OAuth Login
  login() {
    window.location.href = 'http://localhost:8082/oauth2/authorization/github';
  }
}
