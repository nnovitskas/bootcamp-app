import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { FilterPipe } from '@shared/pipes/filter.pipe';
import {ProductsComponent} from './products.component.';
import {ProductsRoutingModule} from './products-routing.module';
import { RouterModule } from '@angular/router';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {ProductsService} from './services/products.service';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatSelectModule} from '@angular/material';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [ProductsListComponent, ProductListItemComponent, FilterPipe, ProductsComponent, ProductDescriptionComponent, ProductFormComponent, AddProductComponent],
  entryComponents: [AddProductComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    ProductsRoutingModule,
    RouterModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [ProductsService, { provide: FirestoreSettingsToken, useValue: {}}],
  exports: [
    ProductsListComponent,
    ProductsComponent,
    ProductFormComponent,
    AddProductComponent
  ]
})
export class ProductsModule { }
