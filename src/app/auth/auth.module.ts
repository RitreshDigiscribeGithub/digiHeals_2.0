import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OtpScreenComponent } from './otp-screen/otp-screen.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { ShareComponentsModule } from '../shared/components/share-components.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './registration/personal-info/personal-info.component';
import { HealthInfoComponent } from './registration/health-info/health-info.component';
import { antForAuth } from '../shared/themes/antModule';
import { NzFormModule } from 'ng-zorro-antd/form';
import { MessageService } from '@services/message.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DynamicTitleService } from '@app/shared/utility/dynamic-title.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

const authRoues: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'verifyCode', component: OtpScreenComponent },
      { path: 'register/:mobile', component: RegistrationComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    OtpScreenComponent,
    RegistrationComponent,
    AuthComponent,
    PersonalInfoComponent,
    HealthInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    antForAuth(),
    NgOtpInputModule,
    ShareComponentsModule,
    RouterModule.forChild(authRoues),
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzSelectModule,
    NzAutocompleteModule
  ],
  providers: [
    MessageService,
    NzNotificationService,
    NzMessageService,
    NzModalService,
    DynamicTitleService,
  ],
})
export class AuthModule {}
