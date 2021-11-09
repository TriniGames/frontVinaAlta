import { MainSupliesComponent } from './main-suplies/main-suplies.component';
import { CommonModule } from '@angular/common';
import { DamajuanasComponent } from './damajuanas/damajuanas.component';
import { NgModule } from '@angular/core';
import { SuppliesRoutingModule } from './supplies-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CreateEditMainSupplyComponent } from './create-edit-main-supply/create-edit-main-supply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DamajuanasComponent, MainSupliesComponent, CreateEditMainSupplyComponent],
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
    MatButtonModule
  ]
})
export class SuppliesModule { }
