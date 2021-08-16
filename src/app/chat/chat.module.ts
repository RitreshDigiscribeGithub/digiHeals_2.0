import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareComponentsModule } from '../shared/components/share-components.module';
import { antForChat } from '../shared/themes/antModule';
import { DoctorsComponent } from './doctors/doctors.component';
import { ChatToDoctorComponent } from './chat-to-doctor/chat-to-doctor.component';
import { MakeCallComponent } from './make-call/make-call.component';
import { FormsModule } from '@angular/forms';

const chatRoutes: Routes = [
  {
    path: '', component: ChatComponent,
    children: [
      { path: 'doctors', component: DoctorsComponent },
      { path: '', redirectTo: 'doctors', pathMatch: 'full' },
      { path: 'doctors/:username', component: ChatToDoctorComponent }
    ]
  }
]

@NgModule({
  declarations: [
    ChatComponent,
    DoctorsComponent,
    ChatToDoctorComponent,
    MakeCallComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareComponentsModule,
    antForChat(),
    RouterModule.forChild(chatRoutes)
  ]
})
export class ChatModule { }
