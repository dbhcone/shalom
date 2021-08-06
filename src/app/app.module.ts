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
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { PaymentHistoryComponent } from './components/userdashboard/payment-history/payment-history.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AngularMaterialModule } from './angular-material.module';
import {  HttpClientModule } from '@angular/common/http';
import { AddMemberComponent } from './components/admin/members/add-member.component';
import { ProfileComponent } from './components/userdashboard/profile/profile.component';
import { ReportsComponent } from './components/userdashboard/reports/reports.component';
import { PaymentsComponent } from './components/admin/payments/payments.component';
import { MakePaymentComponent } from './components/admin/payments/make-payment.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MembersComponent,
    UserdashboardComponent,
    PaymentHistoryComponent,
    AddMemberComponent,
    ProfileComponent,
    ReportsComponent,
    PaymentsComponent,
    MakePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTableExporterModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
