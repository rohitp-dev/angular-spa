import { Injectable } from '@angular/core';
import { Products } from './products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productArr: Products[] = [
    {
      _id: '123',
      name: 'abc',
      type: 'electronic',
      manfuctured_date: '12/12/2022',
      price: 400,
      image: '',
      description: 'test data',
    },
    {
      _id: '223',
      name: 'xyz',
      type: 'clothes',
      manfuctured_date: '11/12/2022',
      price: 400,
      image: '',
      description: 'test data `123',
    },
  ];
  constructor() {}

  async create(product: Products) {
    console.log('product', product);

    return this.productArr.push(product);
  }
  async update(id: string, product: Products) {
    this.productArr = this.productArr.map((p) => {
      if (p._id == id) {
        return product;
      }
      return p;
    });
    return this.display();
  }
  async delete(id: string) {
    this.productArr = this.productArr.filter((p) => p._id != id);
    return this.display();
  }
  async display() {
    return this.productArr;
  }
  async get(id: string) {
    const updateDetails = this.productArr.find((p) => p._id == id);
    console.log('updateDetails==>', updateDetails);
    return updateDetails;
  }
}
