import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareComponentsModule } from '../shared/components/share-components.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RecordsComponent } from './records/records.component';
import { SearchComponent } from './search/search.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { antForDashboard } from '../shared/themes/antModule';
import { DashboardCardComponent } from './home/dashboard-card/dashboard-card.component';

const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointment', component: AppointmentComponent },
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    RecordsComponent,
    SearchComponent,
    AppointmentComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ShareComponentsModule,
    antForDashboard(),
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
