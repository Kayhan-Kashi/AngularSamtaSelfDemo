import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CurrencyFormatPipe } from './currency-format-pipe';

@NgModule({
  declarations: [CurrencyFormatPipe],
  exports: [],
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CustomPipeModule {}
