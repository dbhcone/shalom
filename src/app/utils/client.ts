import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
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

  GET(endpoint: string): Observable<Object>  {
    return this.http.get(`${endpoint}`, {
      headers: this.headers,
    });
  }

  POST(endpoint: string, data?: any): Observable<Object>  {
    return this.http.post(`${endpoint}`, data, {
      headers: this.headers,
    });
  }
}
