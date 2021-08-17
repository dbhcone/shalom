import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdmindashboardComponent } from './components/admin/dashboard/admindashboard.component';
import { MembersComponent } from './components/admin/members/members.component';
import { PaymentsComponent } from './components/admin/payments/payments.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentHistoryComponent } from './components/userdashboard/payment-history/payment-history.component';
import { ProfileComponent } from './components/userdashboard/profile/profile.component';
import { ReportsComponent } from './components/userdashboard/reports/reports.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'members', component: MembersComponent },
      { path: 'dashboard', component: AdmindashboardComponent },
      { path: 'payments', component: PaymentsComponent },
    ],
  },
  {
    path: 'my-dashboard',
    component: UserdashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'payment-history', component: PaymentHistoryComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
