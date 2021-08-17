import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MakePaymentComponent } from './make-payment.component';
import { PaymentService } from 'src/app/services/payment.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['surname', 'firstName', 'otherNames', 'amount', 'year', 'month', 'date', 'delete'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    constructor(private dialog: MatDialog, private payment: PaymentService) {
        this.dataSource = new MatTableDataSource();

        this.fetchAllPayments();
    }
    ngOnInit(): void {}

    ngAfterViewInit(): void {
        console.log('Called');
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    fetchAllPayments() {
        this.payment.getAllPayments().subscribe((res: any) => {
            console.log(res);
            this.dataSource.data = res.data.map((dues: any) => {
                const {
                    payer: { _id, ...payer },
                    ...payerremaindetails
                } = dues;
                return { ...payer, ...payerremaindetails };
            });
        });
    }
    triggerDeletePayment(_id: any) {
        Swal.fire({
            title: 'Delete Payment - Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                this.deletePayment(_id);
            } else {
                Swal.fire('Cancelled', 'Your data is safe :)', 'error');
            }
        });
    }

    deletePayment(_id: string) {
        this.payment.deletePayment({ _id }).subscribe(
            async (resp: any) => {
                console.log('Delete', resp);
                Swal.fire({ text: resp.message, icon: 'success' }).then((result) => {
                    this.fetchAllPayments();
                });
            },
            (err) => {
                Swal.fire({
                    title: `${err.error.status} - ${err.error.code}`,
                    text: `${err.error.message}`,
                });
            },
        );
    }
    openPaymentDialog() {
        const dialogRef = this.dialog.open(MakePaymentComponent, {
            width: '500px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.fetchAllPayments();

            console.log(result);
        });
    }

    formatDate(date: any) {
        return moment(date).format('dddd, Do MMMM, YYYY @ h:mm:ss a');
    }

    getTotalPayments() {
        return this.dataSource.data.map((t) => t.amount).reduce((acc, value) => acc + value, 0);
    }
}
