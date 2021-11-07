import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { RouterModule, Routes } from '@angular/router';
import { antForAppointment } from 'src/app/shared/themes/antModule';
import { ShareComponentsModule } from 'src/app/shared/components/share-components.module';
import { ClinicCenterComponent } from './clinic-center/clinic-center.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScheduleComponent } from './schedule/schedule.component';
import { OverviewComponent } from './overview/overview.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { MessageService } from '@services/message.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';

const appointmentRoutes: Routes = [
  {
    path: '', component: AppointmentComponent,
    children: [
      { path: 'clinic-center', component: ClinicCenterComponent },
      { path: '', redirectTo: 'clinic-center', pathMatch: 'full' },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'reschedule/:id', component: ScheduleComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'checkOut', component: CheckOutComponent },
    ]
  }
]

@NgModule({
  declarations: [AppointmentComponent, ClinicCenterComponent, ScheduleComponent, OverviewComponent, CheckOutComponent],
  imports: [
    CommonModule,
    ShareComponentsModule,
    CarouselModule,
    antForAppointment(),
    RouterModule.forChild(appointmentRoutes),
    NzAlertModule,
    NzSpinModule,
    NzNotificationModule,
    NzSpaceModule
  ],
  providers:[MessageService,NzNotificationService,NzModalService]
})
export class AppointmentModule { }
