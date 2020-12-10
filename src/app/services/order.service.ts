import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../interfaces/order';
import { Item } from '../interfaces/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderForm;
  modalTitle: string;
  activeOrder: Order;
  tempActiveOrder: Order;

  orders: Order[] = [
    {
      totalPrice: 246,
      customerName: 'PewDiePie',
      email: 'PewDiePie@gmail.com',
      items: [
        {
          category: 'CPU',
          name: 'AMD Ryzen 5 2600',
          price: 117
        },
        {
          category: 'Motherboard',
          name: 'MSI PRO Z390-A',
          price: 129
        },
      ]
    },
    {
      totalPrice: 306,
      customerName: 'Filthy Frank',
      email: 'georgemiller@gmail.com',
      items: [
        {
          category: 'Video Card',
          name: 'ZOTAC GeForce GTX 1060',
          price: 209
        },
        {
          category: 'Memory',
          name: 'CORSAIR Vengeance RGB Pro 16GB',
          price: 97
        },
      ]
    },
  ];

  categories = ['CPU', 'Motherboard', 'Video Card', 'Memory'];

  itemList: Item[] = [
    { category: 'CPU', name: 'AMD Ryzen 5 2600', price: 117 },
    { category: 'CPU', name: 'Intel Core i5-9600K', price: 229 },
    { category: 'CPU', name: 'AMD RYZEN 5 3600', price: 194 },
    { category: 'Motherboard', name: 'MSI PRO Z390-A', price: 129 },
    { category: 'Motherboard', name: 'ASUS PRIME B360M-A', price: 84 },
    { category: 'Motherboard', name: 'ASRock B450M PRO4 AM4', price: 79 },
    { category: 'Video Card', name: 'ZOTAC GeForce GTX 1060', price: 209 },
    { category: 'Video Card', name: 'MSI Radeon RX 580', price: 189 },
    { category: 'Video Card', name: 'GIGABYTE GeForce RTX 2070', price: 499 },
    { category: 'Memory', name: 'CORSAIR Vengeance RGB Pro 16GB', price: 97 },
    { category: 'Memory', name: 'G.SKILL TridentZ RGB Series 16GB', price: 86 },
    { category: 'Memory', name: 'G.SKILL Ripjaws Series 8GB', price: 42 },
  ];

  constructor(private modalService: NgbModal, private fb: FormBuilder) {

    this.orderForm = this.fb.group({
      customerName: [],
      email: [],
      items: this.fb.array([])
    });
  }

  get itemsArrayForm() {
    return this.orderForm.get('items') as FormArray;
  }

  getItemByCategory(category:string) {
    return this.itemList.filter((item) => item.category === category);
  }

  open(content, order) {
    if (order) {
      this.modalTitle = 'Edit Order';
      this.activeOrder = order;
      // Save original data for restore when cancel
      this.tempActiveOrder = JSON.parse(JSON.stringify(order));
    } else {
      this.modalTitle = 'Add New Order'
      this.activeOrder = {
        customerName: '',
        email: '',
        items: [{
          category: '',
          name: '',
          price: 0,
        }],
        totalPrice: 0
      };
    }

    order.items.forEach((item, itemIndex) => {
      this.itemList.forEach((data, dataIndex) => {
        if (item.name === data.name) {
          order.items[itemIndex] = this.itemList[dataIndex];
        }
      });
    });
  
    this.updateItemsFormArray();

    this.modalService.open(content, {size: 'xl'}).result.then(() => {
      // Save function
      this.activeOrder.totalPrice = 0;
      this.activeOrder.items.forEach(item => {
        this.activeOrder.totalPrice += item.price
      });

      // Save the order if it's a new order
      if (!order) {
        this.orders.push(this.activeOrder);
      }
      }, () => {
        // Function when cancel add/save order
      Object.assign(this.activeOrder, this.tempActiveOrder);
      }).finally(() => this.tempActiveOrder = null);
  }

  deleteOrder(index: number): void {
    this.orders.splice(index, 1);
  }

  removeItemFromOrder(order: Order, itemIndex: number): void {
    if (!order || itemIndex === undefined) {
      return;
    }
    // Splice(remove) item by item index
    order.items.splice(itemIndex, 1);
    this.updateItemsFormArray()
  }

  addItemToOrder(order: Order) {
    order.items.push({
      category: '',
      name: '',
      price: 0,
    });
    this.updateItemsFormArray()
  }

  updateItemsFormArray() {
    this.itemsArrayForm.clear();
    this.activeOrder.items.forEach(() => {
      this.itemsArrayForm.push(
        this.fb.group({
          category: [], name: [], price: ['', Validators.min(0)]
        })
      );
    })
  }

}
