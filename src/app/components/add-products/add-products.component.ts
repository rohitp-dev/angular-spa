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
      if (this.paramsId) {
        this.updateProductDetail = await this.productsService.findOne(this.paramsId).toPromise();
        this.myForm.patchValue(this.updateProductDetail);
      }
    });

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      manufactured_date: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async addProducts() {
    if(!this.paramsId)
    {
      await this.productsService.createOne(this.myForm.value).toPromise();
      return this.router.navigate(['/products']);
    }
    await this.productsService.updateOne(this.paramsId, this.myForm.value).toPromise();
    
    return this.router.navigate(['/products']);

  }

}
