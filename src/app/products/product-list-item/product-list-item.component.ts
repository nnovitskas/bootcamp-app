import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {ProductItemModel} from '../models/product-item.model';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'boot-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product;
  isAdmin: boolean;

  constructor(private productsService: ProductsService,
              private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  deleteItem(ev, item: ProductItemModel): void {
    ev.stopPropagation();
    this.productsService.deleteProduct(this.product.id);
  }

}
