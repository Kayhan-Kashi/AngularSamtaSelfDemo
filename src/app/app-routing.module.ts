import { NotFoundErrorComponent } from './shared/not-found/not-found-error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/layout/default-layout/default-layout.component';
import { MainPageModule } from './main-page/main-page.module';
import { AuthGuard } from './_helpers/auth.guard';
import { SSOLoginCallbackComponent } from './shared/ssologin-callback/ssologin-callback.component';
import { UserLogoutComponent } from './shared/layout/user-logout/user-logout.component';
import { ServerErrorComponent } from './shared/server-error/server-error.component';
import {} from './shared/server-error/server-error.component';
import { SystemManagementModule } from './system-management/system-management.module';

export const AyandehRoutes: Routes = [
  {
    path: 'Login',
    title: 'ورود',
    component: DefaultLayoutComponent,
    data: {
      breadcrumb: 'login',
    },
  },
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
    path: 'Error/ServerError',
    title: 'خطا',
    component: ServerErrorComponent,
    data: {
      breadcrumb: 'خطا',
    },
  },
  {
    path: 'Error/NotFoundError',
    title: 'خطا',
    component: NotFoundErrorComponent,
    data: {
      breadcrumb: 'خطا',
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
    path: 'SystemManagement',
    title: 'مدیریت سامانه',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'مدیریت سامانه',
    },
    loadChildren: () => SystemManagementModule,
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
