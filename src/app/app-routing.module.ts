import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      {
        path: 'supplies',
        loadChildren: () => import('./modules/supplies/supplies.module').then(mod => mod.SuppliesModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authenticate/authenticate.module').then(mod => mod.AuthenticateModule)
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
