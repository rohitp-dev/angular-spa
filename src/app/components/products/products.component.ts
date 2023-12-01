import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allProducts;
  constructor(private productsService: ProductsService, private router: Router) {}
  ngOnInit() {
    this.getAllproducts();
  }
  async getAllproducts() {
    this.allProducts = await this.productsService.display();
  }

  async deleteProduct(id: string) {
    this.allProducts = await this.productsService.delete(id);
    this.getAllproducts();
  }
  async editProduct(id: string) {
    // const productDetail = await this.productsService.get(id);
    this.router.navigate(['/updateProduct', id]);
    // this.allProducts = await this.productsService.update(id, productDetail);
  }
}
