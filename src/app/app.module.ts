import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareComponentsModule } from './shared/components/share-components.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginAuthGuard } from './guards/login-auth-guard.service';
import { BaseHttpService } from './services/base-http.service';
import { DoctorService } from './services/doctor-service/doctor.service';
import { LazyService } from './services/lazy.service';
import { DgPaymentServiceService } from './services/patient-service/dg-payment-service.service';
import { PatientService } from './services/patient-service/patient.service';
import { ExternalLibraryService } from './services/patient-service/utilsPayment';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent
  ],
  imports: [
    BrowserModule,
    ShareComponentsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NzProgressModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    BaseHttpService,
    PatientService,
    DoctorService,
    DgPaymentServiceService,
    ExternalLibraryService,
    AuthGuard,
    LoginAuthGuard,
    LazyService,
    NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
