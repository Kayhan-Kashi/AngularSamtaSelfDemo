import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { HorizontalMenuComponent } from './shared/layout/horizontal-menu/horizontal-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DefaultLayoutComponent } from './shared/layout/default-layout/default-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { SSOLoginCallbackComponent } from './shared/ssologin-callback/ssologin-callback.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CustomDateAdapter } from './shared/utilities/CustomDateAdapter';
import { UserLogoutComponent } from './shared/layout/user-logout/user-logout.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { TableComponent } from './shared/components/table/table.component';
import { MenuDropDownComponent } from './shared/components/menu-drop-down/menu-drop-down.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DataPropertyGetterPipe } from './shared/components/table/data-property-getter-pipe/data-property-getter.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    DefaultLayoutComponent,
    SidebarComponent,
    SSOLoginCallbackComponent,
    UserLogoutComponent,
    FooterComponent,
    TableComponent,
    MenuDropDownComponent,
    DataPropertyGetterPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    CdkTreeModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    // { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    // {
    //   provide: DateAdapter,
    //   useClass: CustomDateAdapter,
    //   deps: [MAT_DATE_LOCALE],
    // },
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: JwtHelperService,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS, useClass: JwtHelperService },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
