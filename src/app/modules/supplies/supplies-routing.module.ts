import { RouterModule, Routes } from '@angular/router';

import { CajasComponent } from './cajas/cajas.component';
import { DamajuanasComponent } from './damajuanas/damajuanas.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'cajas',
    component: CajasComponent
  },
  {
    path: 'damajuanas',
    component: DamajuanasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
