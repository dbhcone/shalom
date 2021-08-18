import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MembersComponent } from './components/admin/members/members.component';
import { UserComponent } from './components/user/user.component';
import { PaymentHistoryComponent } from './components/user/payment-history/payment-history.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AddMemberComponent } from './components/admin/members/add-member.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ReportsComponent } from './components/user/reports/reports.component';
import { PaymentsComponent } from './components/admin/payments/payments.component';
import { MakePaymentComponent } from './components/admin/payments/make-payment.component';
import { AdmindashboardComponent } from './components/admin/dashboard/admindashboard.component';
import { MembersComponent as SharedMembersComponent } from './components/shared/members/members.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MembersComponent,
    UserComponent,
    PaymentHistoryComponent,
    AddMemberComponent,
    ProfileComponent,
    ReportsComponent,
    PaymentsComponent,
    MakePaymentComponent,
    AdmindashboardComponent,
    SharedMembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTableExporterModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
