import { Injectable } from '@angular/core';
import { Client } from '../utils/client';
import { Payments } from '../api/endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../interfaces/payments.interface';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private client: Client) { }

  getAllPayments(): Observable<Object> {
    return this.client.POST(`${environment.apiroot}${Payments.all}`)
  }

  makePayment(payment: Payment) : Observable<Object>{
    return this.client.POST(`${environment.apiroot}${Payments.all}`, payment)
  }

  
}
