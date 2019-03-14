import { Component, OnInit } from '@angular/core';
import { ProductItemModel } from '../models/product-item.model';
import { ProductsService } from '../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'boot-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductItemModel[];
  searchQuery;
  isAdmin: boolean;

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.activatedRoute.params.subscribe((res) => {
      this.productsService.getProducts().subscribe((products: ProductItemModel[]) => {
        this.products = res.categoryId === 'all' ? products : products.filter(p => p.category.toLowerCase() === res.categoryId);
      });
    });

  }

  openAddNewProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '480px',
      data: {
        name: null,
        description: null,
        price: null,
        category: null,
        imgUrl: null,
        isHidden: null
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.productsService.createProduct(res);
    });
  }

}
