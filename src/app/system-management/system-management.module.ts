import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SystemManagementRoutingModule } from './system-management-routing.module';
import { PlanComponent } from './plan/plan.component';

@NgModule({
  declarations: [PlanComponent],
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class SystemManagementModule {}
