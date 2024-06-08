import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { SystemManagementComponent } from './system-management/system-management.component';

const routes: Routes = [
  {
    path: '',
    component: SystemManagementComponent,
    data: {
      breadcrumb: 'مدیریت سیستم',
    },
  },
  //{
  //    path: 'Setting',
  //    title: 'تنظیمات',
  //    component: SettingComponent,
  //    data: {
  //        breadcrumb: 'تنظیمات'
  //    },
  //},
  {
    path: 'Plan',
    title: 'طرح ها',
    component: PlanComponent,
    data: {
      breadcrumb: 'طرح ها',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManagementRoutingModule {}
