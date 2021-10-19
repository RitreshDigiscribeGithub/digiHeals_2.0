import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthGuard } from '@guards/login-auth-guard.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[LoginAuthGuard] },
  { path: 'languages', loadChildren: () => import('./languages/languages.module').then(m => m.LanguagesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  {path:'quickscan/sso/:username',component:SplashScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
