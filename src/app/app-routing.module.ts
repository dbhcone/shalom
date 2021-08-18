import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdmindashboardComponent } from './components/admin/dashboard/admindashboard.component';
import { MembersComponent } from './components/admin/members/members.component';
import { MembersComponent as SharedMembersComponent } from './components/shared/members/members.component';
import { PaymentsComponent } from './components/admin/payments/payments.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentHistoryComponent } from './components/user/payment-history/payment-history.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ReportsComponent } from './components/user/reports/reports.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
    //#region General routes
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'logout', redirectTo: 'login' },
    //#endregion
    
    //#region Admin routes
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'members', component: MembersComponent },
            { path: 'dashboard', component: AdmindashboardComponent },
            { path: 'payments', component: PaymentsComponent },
        ],
    },
    //#endregion
    
    //#region User routes
    {
        path: 'user',
        component: UserComponent,
        children: [
            { path: 'members', component: SharedMembersComponent },
            { path: 'profile/:id', component: ProfileComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'payment-history', component: PaymentHistoryComponent },
            { path: 'reports', component: ReportsComponent },
        ],
    },
    //#endregion
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
