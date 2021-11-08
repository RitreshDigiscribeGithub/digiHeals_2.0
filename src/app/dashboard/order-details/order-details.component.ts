import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.less'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(private titleService: DynamicTitleService) {}
  trackOrder: any[] = [
    { status: 'Order Placed on Tuesday, 20 Aug' },
    { status: 'Order Confirmed on Tuesday, 20 Aug' },
    { status: 'Shipping Order' },
    { status: 'Out for Delivery' },
  ];
  ngOnInit(): void {
    this.titleService.setHeaderTitle('Your Orders Details');
  }
}
