import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/services/order.service'

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderForm = this.orderService.orderForm;
  constructor(private orderService: OrderService) { }

  orders = this.orderService.orders;

  ngOnInit() {
  }

}
