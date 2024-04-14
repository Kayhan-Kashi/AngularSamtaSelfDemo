import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/layout/default-layout/default-layout.component';
import { MainPageModule } from './main-page/main-page.module';
import { AuthGuard } from './_helpers/auth.guard';
import { SSOLoginCallbackComponent } from './shared/ssologin-callback/ssologin-callback.component';
import { UserLogoutComponent } from './shared/layout/user-logout/user-logout.component';

export const AyandehRoutes: Routes = [
  {
    path: 'LoginCallback',
    component: SSOLoginCallbackComponent,
    data: {
      breadcrumb: 'login callback',
    },
  },
  {
    path: 'User/Logout',
    title: 'خروج',
    component: UserLogoutComponent,
    data: {
      breadcrumb: 'خروج',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
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
