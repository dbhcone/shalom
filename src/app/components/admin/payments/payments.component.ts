import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MakePaymentComponent } from './make-payment.component';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['amount', 'year', 'month', 'date'];
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
            this.dataSource.data = res.data;
        });
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
}
