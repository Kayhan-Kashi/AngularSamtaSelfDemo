import { Injector, Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../TableColumn';
import { GroupInstallmentFiles } from 'src/app/_entities/groupInstallmentFiles';

@Pipe({
  name: 'dataPropertyGetter',
})
export class DataPropertyGetterPipe implements PipeTransform {
  constructor(private injector: Injector) {}

  transform(object: any, tableColumn: TableColumn, ...args: any[]): any {
    let commaSeperatedKeys = tableColumn.dataKey.split(',');
    if (commaSeperatedKeys.length >= 2) {
      if (tableColumn.pipe) {
        let arrParameter: any[] = [];
        commaSeperatedKeys.forEach((x) =>
          arrParameter.push(this.renderDataKey(object, x))
        );
        let pipe = this.injector.get(tableColumn.pipe);
        return pipe.transform(arrParameter);
      } else {
        throw new Error('You need a PipeTransform for this format of columns');
      }
    }
    let dataValue: any = this.renderDataKey(object, tableColumn.dataKey);

    if (tableColumn.isFiles) {
      let files = '';
      let objs: Array<GroupInstallmentFiles> = dataValue;
      for (let item of objs) {
        let obj = GroupInstallmentFiles.createInstance({
          id: item.id,
          fileTypeId: item.fileTypeId,
          fileName: item.fileName,
          attachment: item.attachment,
        });
        files += obj.AtachmentHtml(); //.outerHTML
      }
      return files;
    }
    if (tableColumn.pipe) {
      let pipe = this.injector.get(tableColumn.pipe);
      return pipe.transform(dataValue);
    }

    return dataValue;
  }

  renderDataKey(object: any, dataKey: string): any {
    let dataValue: any = object[dataKey];
    let nestedDataKey = dataKey.split('.');
    if (nestedDataKey.length >= 2) {
      nestedDataKey.forEach((x) => (object = object[x]));
      dataValue = object;
    }
    return dataValue;
  }
}
