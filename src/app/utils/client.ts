import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env, environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Client {
  // httpe: HttpClient;

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('user-token')}`,
    'Content-Type': 'application/json',
  });

  GET(endpoint: string)  {
    return this.http.get<Record<string, unknown>>(`${environment.apiroot}${endpoint}`, {
      headers: this.headers,
    });
  }

  POST(endpoint: string, data?: any)  {
    return this.http.post<Record<string, unknown>>(`${environment.apiroot}${endpoint}`, data, {
      headers: this.headers,
    });
  }
}
