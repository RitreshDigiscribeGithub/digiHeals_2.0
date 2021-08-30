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

const appointmentRoutes: Routes = [
  {
    path: '', component: AppointmentComponent,
    children: [
      { path: 'clinic-center', component: ClinicCenterComponent },
      { path: '', redirectTo: 'clinic-center', pathMatch: 'full' },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'reschedule', component: ScheduleComponent },
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
    RouterModule.forChild(appointmentRoutes)
  ]
})
export class AppointmentModule { }
