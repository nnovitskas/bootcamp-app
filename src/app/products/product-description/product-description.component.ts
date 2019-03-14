import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'boot-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  product;
  isEditMode;
  isAdmin: boolean;

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.activatedRoute.data.subscribe((res: any) => {
        this.product = res.detailsData;
    });
  }

  deleteItem() {
    this.productsService.deleteProduct(this.product.id).then( res => {
      this.router.navigate(['/products', 'all']);
    });
  }

  editModeOn() {
    this.isEditMode = true;
  }

  editModeOff() {
    this.isEditMode = false;
  }

  saveProduct() {
    this.productsService.updateProductById(this.product).then( res => {
      this.isEditMode = false;
    });
  }
}
