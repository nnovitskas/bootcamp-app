import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products.component.';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductDescriptionComponent} from './product-description/product-description.component';
import {ProductDetailsResolver} from './resolvers/product.details.resolver';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: ':categoryId',
        component: ProductsListComponent,
      },
      {
        path: ':categoryId/:id',
        component: ProductDescriptionComponent,
        resolve: {
          detailsData: ProductDetailsResolver
        }
        },
      {
        path: '',
        redirectTo: 'all'
      }]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ProductDetailsResolver]
})
export class ProductsRoutingModule { }
