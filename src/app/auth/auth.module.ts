import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OtpScreenComponent } from './otp-screen/otp-screen.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { ShareComponentsModule } from '../shared/components/share-components.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './registration/personal-info/personal-info.component';
import { HealthInfoComponent } from './registration/health-info/health-info.component';
import { antForAuth } from '../shared/themes/antModule';

const authRoues: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'verifyCode', component: OtpScreenComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    OtpScreenComponent,
    RegistrationComponent,
    AuthComponent,
    PersonalInfoComponent,
    HealthInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    antForAuth(),
    NgOtpInputModule,
    ShareComponentsModule,
    RouterModule.forChild(authRoues),
  ]
})
export class AuthModule { }
