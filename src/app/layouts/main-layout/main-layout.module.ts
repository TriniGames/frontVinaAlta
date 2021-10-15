import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    SidebarMenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MainLayoutComponent]
})

export class MainLayoutModule { }
