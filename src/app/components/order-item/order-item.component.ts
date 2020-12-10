import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: object;
  @Input() modalTemplate: ElementRef;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

}
