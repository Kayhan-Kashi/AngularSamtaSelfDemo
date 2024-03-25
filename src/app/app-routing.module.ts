import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/layout/default-layout/default-layout.component';
import { MainPageModule } from './main-page/main-page.module';

export const AyandehRoutes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => MainPageModule,
      },
      {
        path: 'Dashboard',
        loadChildren: () => MainPageModule,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(AyandehRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
