import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit, OnDestroy {
  makePaymentForm;
  members: any[] = [];
  _members: Subscription;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.makePaymentForm = this.fb.group({
      amount: [10, [Validators.min(10), Validators.required]],
      // recordedBy: ['', [Validators.required]]
      payer: ['', [Validators.required, Validators.minLength(10)]],
      year: ['', [Validators.required, Validators.min(2010)]],
      month: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

    this._members = this.auth.getMembersList().subscribe(async (resp: any) => {
      this.members = resp.data;
      console.log('fetched members', this.members);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._members.unsubscribe();
  }

  onPayerChanged(event: MatSelectChange) {
    console.log('Payer changed', event.source.value);
  }

  onSubmit(): void {
    console.log('Submit', this.makePaymentForm.value)
  }

  get month () : AbstractControl | null {
    return this.makePaymentForm.get("month");
  }

  get year () : AbstractControl | null {
    return this.makePaymentForm.get("year");
  }

  get date () : AbstractControl | null {
    return this.makePaymentForm.get("date");
  }

  get payer () : AbstractControl | null {
    return this.makePaymentForm.get("payer");
  }

  get amount () : AbstractControl | null {
    return this.makePaymentForm.get("amount");
  }
}
