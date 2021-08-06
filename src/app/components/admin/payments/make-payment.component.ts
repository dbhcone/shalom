import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  makePaymentForm;
  constructor(private fb: FormBuilder) {
    this.makePaymentForm = this.fb.group({
      
    })
   }

  ngOnInit(): void {
  }

}
