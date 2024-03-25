import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MainPageRoutingModule],
})
export class MainPageModule {}
