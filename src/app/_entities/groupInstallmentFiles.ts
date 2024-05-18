import { switchMapTo } from 'rxjs';

export class GroupInstallmentFiles {
  public static createInstance({
    id,
    fileTypeId,
    fileName,
    attachment,
  }): GroupInstallmentFiles {
    return new GroupInstallmentFiles(id, fileTypeId, fileName, attachment);
  }

  constructor(
    public _id: number,
    public _fileTypeId: number,
    public _fileName: string,
    public _attachment: Uint8Array
  ) {
    this.id = _id;
    this.fileTypeId = _fileTypeId;
    this.fileName = _fileName;
    this.attachment = _attachment;
  }

  id: number;
  fileTypeId: number;
  fileName?: string;
  attachment?: Uint8Array;
  public AtachmentHtml(): string | null {
    if (this.attachment) {
      var htmlElement: HTMLElement;
      htmlElement = document.createElement('a');
      htmlElement.innerText = this.fileName!;
      htmlElement.setAttribute('href', this.attachment.toString());
      return (
        '<a download href="data:' +
        this.getMimeTypeFromFileName(this.fileName!) +
        ';base64,' +
        this.attachment.toString() +
        '" class="btn btn-secondary w-100 p-1 mb-1" title="' +
        this.fileName +
        '"> ' +
        this.summery(this.fileName, '150px') +
        '</a>'
      );
    }
    return null;
  }
  private getMimeTypeFromFileName(fileName: string): string {
    let fileMime = '';
    if (fileName && fileName.length > 0) {
      const splited = fileName.split('.');
      const fileType = splited[splited.length - 1];
      switch (fileType) {
        case 'doc':
          fileMime = 'application/msword';
          break;
        case 'dot':
          fileMime = 'application/msword';
          break;
        case 'docx':
          fileMime =
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case 'dotx':
          fileMime =
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template';
          break;
        case 'docm':
          fileMime = 'application/vnd.ms-word.document.macroEnabled.12';
          break;
        case 'dotm':
          fileMime = 'application/vnd.ms-word.template.macroEnabled.12';
          break;
        case 'xls':
          fileMime = 'application/vnd.ms-excel';
          break;
        case 'xlt':
          fileMime = 'application/vnd.ms-excel';
          break;
        case 'xla':
          fileMime = 'application/vnd.ms-excel';
          break;
        case 'xlsx':
          fileMime =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        case 'xltx':
          fileMime =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template';
          break;
        case 'xlsm':
          fileMime = 'application/vnd.ms-excel.sheet.macroEnabled.12';
          break;
        case 'xltm':
          fileMime = 'application/vnd.ms-excel.template.macroEnabled.12';
          break;
        case 'xlam':
          fileMime = 'application/vnd.ms-excel.addin.macroEnabled.12';
          break;
        case 'xlsb':
          fileMime = 'application/vnd.ms-excel.sheet.binary.macroEnabled.12';
          break;
        case 'pdf':
          fileMime = 'application/pdf';
          break;
        case 'png':
          fileMime = 'image/png';
          break;
        case 'jpeg':
        case 'jpg':
          fileMime = 'image/jpeg';
          break;
        case 'csv':
          fileMime = 'text/csv';
          break;
      }
    }
    return fileMime;
  }
  private summery(str, size) {
    if (str) {
      const splited = str.split('.');
      const fileType = splited[splited.length - 1];
      const fileName = str.replace('.' + fileType, '');
      size = size.match(/[0-9]*/);
      var endValue = Math.floor(Number(size) / 10) - fileType.length;
      var number;
      var newStr = '';
      if (fileName.length >= endValue) {
        for (number = 0; number <= endValue; number++) {
          if (fileName[number].length != 0) {
            newStr += str[number];
          }
        }
        newStr += '...';
      } else {
        newStr = fileName;
      }

      return newStr + '.' + fileType;
    }
    return 'file';
  }
}
