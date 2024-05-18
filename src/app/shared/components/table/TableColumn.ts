import { Pipe } from '@angular/core';

export interface TableColumn {
  name: string;
  dataKey: string;
  position?: 'right' | 'left';
  isSortable?: boolean;
  hidden?: boolean;
  icon?: string;
  isDate?: boolean;
  pipe?: Pipe;
  isFiles?: boolean;
  BtnClass?: string;
}
