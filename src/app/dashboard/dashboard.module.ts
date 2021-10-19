import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareComponentsModule } from '../shared/components/share-components.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RecordsComponent } from './records/records.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { antForDashboard } from '../shared/themes/antModule';
import { DashboardCardComponent } from './home/dashboard-card/dashboard-card.component';
import { HealthRecordsComponent } from './health-records/health-records.component';
import { AuthGuard } from '@guards/auth-guard.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';

const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointment', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule),canActivate: [AuthGuard]},
      { path: 'health-records', component: HealthRecordsComponent }
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
    DashboardCardComponent,
    HealthRecordsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ShareComponentsModule,
    antForDashboard(),
    RouterModule.forChild(dashboardRoutes),
    NzSkeletonModule,
    NzResultModule
  ]
})
export class DashboardModule { }
