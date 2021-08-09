import { Injectable } from '@angular/core';
import { Client } from '../utils/client';
import { Payment } from '../api/endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private client: Client) { }

  getAllPayments(): Observable<Object> {
    return this.client.POST(`${environment.apiroot}${Payment.all}`)
  }

  
}
