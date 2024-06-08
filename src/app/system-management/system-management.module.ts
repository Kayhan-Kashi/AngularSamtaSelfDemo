import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SystemManagementRoutingModule } from './system-management-routing.module';
import { PlanComponent } from './plan/plan.component';
import { AddPlanComponent } from './plan/add-plan/add-plan.component';
import { SystemManagementComponent } from './system-management/system-management.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckActivationIconPipe } from '../_pipes/check-activation-icon-pipe';
import { DialogModule } from '@angular/cdk/dialog';
import { MatSortModule } from '@angular/material/sort';
import { CustomPipeModule } from '../_pipes/custom-pipe.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from '../shared/components/table/table.component';
import { DataPropertyGetterPipe } from '../shared/components/table/data-property-getter-pipe/data-property-getter.pipe';

@NgModule({
  declarations: [
    PlanComponent,
    AddPlanComponent,
    SystemManagementComponent,
    CheckActivationIconPipe,
    DataPropertyGetterPipe,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SystemManagementRoutingModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    DialogModule,
    AngularEditorModule,
    MatFormFieldModule,
    CustomPipeModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SystemManagementModule {}
