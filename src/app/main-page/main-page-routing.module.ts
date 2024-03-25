import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    title: 'صفحه اصلی',
    component: DashboardComponent,
    data: {
      breadcrumb: 'صفحه اصلی',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
