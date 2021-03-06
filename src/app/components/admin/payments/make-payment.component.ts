import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserAccountHelper } from 'src/app/helpers/functions/user.helper';
import { Payment } from 'src/app/interfaces/payments.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-make-payment',
    templateUrl: './make-payment.component.html',
    styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit, OnDestroy {
    makePaymentForm;
    members: any[] = [];
    _members: Subscription;
    filteredMembers?: Observable<any[]>;
    years = years();

    months = MONTHS;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private pay: PaymentService,
        public dialogRef: MatDialogRef<MakePaymentComponent>,
    ) {
        this.makePaymentForm = this.fb.group({
            amount: [5, [Validators.min(5), Validators.required]],
            // recordedBy: ['', [Validators.required]]
            payer: ['', [Validators.required]],
            year: ['', [Validators.required, Validators.min(2011)]],
            month: ['', [Validators.required]],
            date: [{ value: new Date(), disabled: false }, [Validators.required]],
        });

        this._members = this.auth.getMembersList().subscribe(async (resp: any) => {
            this.members = resp.data;
            console.log('fetched members', this.members);
        });
    }

    ngOnInit(): void {
        this.filteredMembers = this.makePaymentForm.get('payer')?.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value)),
        );
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();

        return this.members.filter((member) => {
            const fullname = this.fullName(member);
            return fullname.toLowerCase().includes(filterValue);
            // ||
            // fullname.toLowerCase().includes(filterValue) ||
            // fullname.toLowerCase().includes(filterValue)
        });
    }

    ngOnDestroy(): void {
        this._members.unsubscribe();
    }

    onPayerChanged(event: MatSelectChange) {
        console.log('Payer changed', event.source.value);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        console.log('Submit', this.makePaymentForm.value);
        const payment: Payment = {
            ...this.makePaymentForm.value,
            recordedBy: '6117c1b077ab66687c3cd469',
        };
        this.pay.makePayment(payment).subscribe(
            async (resp: any) => {
                Swal.fire({
                    text: `${resp.message}`,
                    icon: 'success',
                    timer: 5000,
                }).then(() => {
                    this.closeDialog();
                });
            },
            (err) => {
                Swal.fire({
                    title: `Error - ${err.error.code}`,
                    text: `${err.error.message}`,
                    icon: 'error',
                    timer: 5000,
                });
            },
        );
    }

    fullName(member: any) {
        const { surname, firstName, otherNames } = member;
        return new UserAccountHelper().getFullName({
            surname,
            firstName,
            otherNames,
        });
    }

    get month(): AbstractControl | null {
        return this.makePaymentForm.get('month');
    }

    get year(): AbstractControl | null {
        return this.makePaymentForm.get('year');
    }

    get date(): AbstractControl | null {
        return this.makePaymentForm.get('date');
    }

    get payer(): AbstractControl | null {
        return this.makePaymentForm.get('payer');
    }

    get amount(): AbstractControl | null {
        return this.makePaymentForm.get('amount');
    }
}

const MONTHS: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function years() {
    const baseYear = 2011;
    const upperYear = new Date().getUTCFullYear();
    const years = [];
    for (let i = baseYear; i <= upperYear; i++) {
        years.push(i);
    }
    return years.reverse();
}
