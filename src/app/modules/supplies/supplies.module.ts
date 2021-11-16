import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuppliesRoutingModule } from './supplies-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductComponent } from './product/product.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { CreateEditSupplyComponent } from './create-edit-supply/create-edit-supply.component';
import { SupplyComponent } from './supply/supply.component';
@NgModule({
  declarations: [ProductComponent, CreateEditProductComponent, CreateEditSupplyComponent, SupplyComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
})
export class SuppliesModule {}
