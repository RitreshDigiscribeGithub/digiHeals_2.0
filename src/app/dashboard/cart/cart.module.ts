import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { antForHealsCart } from 'src/app/shared/themes/antModule';
import { HealCartComponent } from './heal-cart/heal-cart.component';
import { ShareComponentsModule } from 'src/app/shared/components/share-components.module';
import { MedicinesComponent } from './heal-cart/medicines/medicines.component';
import { DiagnosticComponent } from './heal-cart/diagnostic/diagnostic.component';
import { ReviewOrderComponent } from './review-order/review-order.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { YourAddressComponent } from './your-address/your-address.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AddedCartComponent } from './added-cart/added-cart.component';
import { DropOffComponent } from './drop-off/drop-off.component';
import { ScheduleTimeComponent } from './schedule-time/schedule-time.component';
import { OrderComponent } from './order/order.component';
import { SelectPartnerComponent } from './select-partner/select-partner.component';
import { AddAddressComponent } from './your-address/add-address/add-address.component';
import { FormsModule } from '@angular/forms';
import { ReviewAndRefillComponent } from './heal-cart/review-and-refill/review-and-refill.component';


const cartRoutes: Routes = [
  {
    path: '', component: CartComponent,
    children: [
      { path: '', redirectTo: 'healCart', pathMatch: 'full' },
      { path: 'healCart', component: HealCartComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'partner', component: SelectPartnerComponent },
      { path: 'allCart', component: AddedCartComponent },
      { path: 'checkOut', component: CheckOutComponent },
      { path: 'address', component: YourAddressComponent },
      { path: 'dropOff', component: DropOffComponent },
      { path: 'reviewOrder', component: ReviewOrderComponent },
      { path: 'schedule-time', component: ScheduleTimeComponent },
    ]
  }
]

@NgModule({
  declarations: [CartComponent, HealCartComponent, MedicinesComponent, DiagnosticComponent, ReviewOrderComponent, OrderConfirmedComponent, YourAddressComponent, CheckOutComponent, AddedCartComponent, DropOffComponent, ScheduleTimeComponent, OrderComponent, SelectPartnerComponent, AddAddressComponent, ReviewAndRefillComponent],
  imports: [
    CommonModule,
    FormsModule,
    antForHealsCart(),
    RouterModule.forChild(cartRoutes),
    ShareComponentsModule
  ]
})

export class CartModule { }
