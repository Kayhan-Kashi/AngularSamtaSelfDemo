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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    DefaultLayoutComponent,
    SidebarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    CdkTreeModule,
    MatTreeModule,
  ],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
