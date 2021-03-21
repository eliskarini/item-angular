import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  @Input() modalTemplate: ElementRef;
  @Input() deleteIndex: number;

  constructor(public orderService: OrderService) { }

  ngOnInit() {
  }

}
