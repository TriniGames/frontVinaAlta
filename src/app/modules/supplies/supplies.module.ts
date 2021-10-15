import { CajasComponent } from './cajas/cajas.component';
import { CommonModule } from '@angular/common';
import { DamajuanasComponent } from './damajuanas/damajuanas.component';
import { NgModule } from '@angular/core';
import { SuppliesRoutingModule } from './supplies-routing.module';

@NgModule({
  declarations: [DamajuanasComponent, CajasComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule
  ]
})
export class SuppliesModule { }
