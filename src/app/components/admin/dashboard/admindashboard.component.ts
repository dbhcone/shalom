import { Component } from '@angular/core';
// import { map, shareReplay } from 'rxjs/operators';
// import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-admindashboard',
    templateUrl: './admindashboard.component.html',
    styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent {
    constructor(private auth: AuthService, private payment: PaymentService) {
        this.getMembersStats();
        this.getPaymentStats();
    }

    membersData: any;
    paymentsData: any;

    options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    getMembersStats() {
        this.auth.getMembersStats().subscribe(
            async (resp: any) => {
                console.log('response ', resp);
                this.membersData = resp.data;
                this.organiseOccupationStats();
            },
            (err) => {
                console.log('Error ' + err.error.message, err.error.code);
            },
        );
    }

    getPaymentStats() {
        this.payment.getPaymentsStats().subscribe(
            async (resp: any) => {
                console.log('response ', resp);
                this.paymentsData = resp.data;
                this.organisePaymentsStats();
            },
            (err) => {
                console.log('Error ' + err.error.message, err.error.code);
            },
        );
    }

    organiseOccupationStats() {
        this.membersData.chart = {
            dataset: {
                labels: this.membersData.occupations.map((value: any) => value._id),
                datasets: [
                    {
                        label: 'Occupations',
                        data: this.membersData.occupations.map((value: any) => value.num),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                    },
                ],
            },
        };
    }

    organisePaymentsStats() {
      this.paymentsData.chart = {
        dataset: {
          // TODO: get the dataset from backend
            labels: this.paymentsData.payments.map((value: any) => value._id),
            datasets: [
                {
                    label: `This year's payments`,
                    // TODO: get the dataset from backend
                    data: this.paymentsData.payments.map((value: any) => value.amount),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                },
            ],
        },
    };
    }
}

// type: line, bar, radar, pie, polarArea, doughnut, bubble and scatter

