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

  getAllPayments() {
    return this.client.POST(`${Payments.all}`)
  }

  makePayment(payment: Payment){
    return this.client.POST(`${Payments.add}`, payment)
  }

  
}
