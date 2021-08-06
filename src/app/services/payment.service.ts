import { Injectable } from '@angular/core';
import { Client } from '../utils/client';
import { Payment } from '../api/endpoints';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private client: Client) { }

  getAllPayments(): Observable<Object> {
    return this.client.POST(Payment.all)
  }
}
