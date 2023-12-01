import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  myForm: FormGroup;
  updateProductDetail;
  paramsId:string;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async(params) => {
       this.paramsId = params.get('id');
      console.log('ID from URL:', this.paramsId);
      this.updateProductDetail = await this.productsService.get(this.paramsId);
      // You can use the id in your component logic here
      this.myForm.patchValue(this.updateProductDetail);
    });

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      manfuctured_date: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async addProducts() {
    if(!this.paramsId)
    {
      await this.productsService.create(this.myForm.value);
      return this.router.navigate(['/products']);
    }
    this.productsService.update(this.paramsId, this.myForm.value);
    console.log("this.myForm.value",this.myForm.value);
    
    return this.router.navigate(['/products']);

  }

}
