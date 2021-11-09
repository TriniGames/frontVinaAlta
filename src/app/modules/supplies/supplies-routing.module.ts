import { RouterModule, Routes } from '@angular/router';
import { MainSupliesComponent } from './main-suplies/main-suplies.component';
import { DamajuanasComponent } from './damajuanas/damajuanas.component';
import { NgModule } from '@angular/core';
import { CreateEditMainSupplyComponent } from './create-edit-main-supply/create-edit-main-supply.component';

const routes: Routes = [
  // {
  //   path: 'supplies/*',
  //   redirectTo: 'cajas'
  // },
  {
    path: 'mainSuplies',
    component: MainSupliesComponent
  },
  {
    path: 'damajuanas',
    component: DamajuanasComponent
  },
  {
    path: 'createEdit',
    component: CreateEditMainSupplyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
