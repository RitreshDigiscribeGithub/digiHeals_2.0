import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BtnDirective } from './directives/btn.directive';
import { HeaderComponent } from './header/header.component';
import { FontDirective } from './directives/font.directive';
import { InputComponent } from './input/input.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { AffixComponent } from './affix/affix.component';
import { CardComponent } from './card/card.component';
import { DoctorCardProfileComponent } from './doctor-card-profile/doctor-card-profile.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { antForShareModule } from '../themes/antModule';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { Btn2Directive } from './directives/btn2.directive';
import { UtilityDirective } from './directives/utility.directive';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const components = [CalendarComponent, SanitizeHtmlPipe, TruncatePipe, BtnDirective, HeaderComponent, FontDirective, InputComponent, TabGroupComponent, AffixComponent, CardComponent, DoctorCardProfileComponent, TimeSlotComponent, Btn2Directive, ConfirmBoxComponent, UtilityDirective,TermsOfUseComponent,PrivacyPolicyComponent];

@NgModule({
  declarations: [components, DialogBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    antForShareModule()
  ],
  exports: [components]
})

export class ShareComponentsModule { }
