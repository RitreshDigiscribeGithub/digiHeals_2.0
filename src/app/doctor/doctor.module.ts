import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRootComponent } from './doctor-root.component';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { antForDoctorModule } from '@app/shared/themes/antModule';
import { ShareComponentsModule } from '@app/shared/components/share-components.module';
import { HomeCarouselComponent } from './doctor-dashboard/partials/home-carousel/home-carousel.component';
import { FooterComponent } from './doctor-dashboard/partials/footer/footer.component';
import { AnchorScrollNavComponent } from './doctor-dashboard/partials/anchor-scroll-nav/anchor-scroll-nav.component';
import { DoctorAppointmentComponent } from './doctor-dashboard/partials/doctor-appointment/doctor-appointment.component';
import { AboutDoctorComponent } from './doctor-dashboard/partials/about-doctor/about-doctor.component';
import { DoctorServicesComponent } from './doctor-dashboard/partials/doctor-services/doctor-services.component';
import { DoctorGalleryComponent } from './doctor-dashboard/partials/doctor-gallery/doctor-gallery.component';
import { DoctorTestimonialComponent } from './doctor-dashboard/partials/doctor-testimonial/doctor-testimonial.component';
import { PatientEducationComponent } from './doctor-dashboard/partials/patient-education/patient-education.component';
import { DoctorClinicLocationsComponent } from './doctor-dashboard/partials/doctor-clinic-locations/doctor-clinic-locations.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SwiperModule } from 'swiper/angular';

const doctorRoutes: Routes = [
  {
    path: '',
    component: DoctorRootComponent,
    children: [{ path: ':doctorName', component: DoctorDashboardComponent }],
  },
];

@NgModule({
  declarations: [
    DoctorRootComponent,
    DoctorDashboardComponent,
    HomeCarouselComponent,
    FooterComponent,
    AnchorScrollNavComponent,
    DoctorAppointmentComponent,
    AboutDoctorComponent,
    DoctorServicesComponent,
    DoctorGalleryComponent,
    DoctorTestimonialComponent,
    PatientEducationComponent,
    DoctorClinicLocationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(doctorRoutes),
    SwiperModule,
    NgImageSliderModule,
    antForDoctorModule(),
    ShareComponentsModule,
  ],
})
export class DoctorModule {}
