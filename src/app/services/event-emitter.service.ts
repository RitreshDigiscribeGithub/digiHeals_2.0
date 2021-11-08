import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSelectpartner = new EventEmitter();    
  invokeAllowHealthPartner = new EventEmitter();    
  invokeBookApptBtn = new EventEmitter();    
  invokeConfirmBtn = new EventEmitter();    
  invokeplaceOrder  = new EventEmitter();    
  saveVitalsInvoke = new EventEmitter();
  invokeSymBtn = new EventEmitter();
  subsVar: Subscription;    

  constructor() { }

  onSelectePartnerBtnClicked() {    
    
    console.log('clicked');

    this.invokeSelectpartner.emit();    
  } 
  OnAllowPartnerClicked() {    
    this.invokeAllowHealthPartner.emit();    
  }   
  onBookApptClicked() {    
    this.invokeBookApptBtn.emit();    
  }   

  onComfirmAppt() {    

    this.invokeConfirmBtn.emit();    
  }   


  onPlaceOrderBtn() {    

    this.invokeplaceOrder.emit();    
  }   

  saveVitalsBtn() {    
    
    this.saveVitalsInvoke.emit();    
  }   
  
  reviewSymBtn() {    
    
    this.invokeSymBtn.emit();    
  }   
  


}
