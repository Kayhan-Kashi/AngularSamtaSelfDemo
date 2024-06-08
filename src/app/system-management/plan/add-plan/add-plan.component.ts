import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'jalali-moment';
import { Observable } from 'rxjs';
import { CurrencyFormatPipe } from 'src/app/_pipes/currency-format-pipe';
import { PlanService } from 'src/app/_services/plan.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css'],
})
export class AddPlanComponent implements OnInit {
  public Planform: FormGroup;
  public selectedFileNames: string[] = [];
  public progressInfos: any[] = [];
  public selectedFiles?: FileList;
  public PlansItems: any[] = [];
  public PersonTypeList: any[];
  public message: string[] = [];
  public previews: string[] = [];
  public FileData: string;
  public minamount: string = '0';
  public maxamount: string = '0';
  public FileName: string;
  public FileType: any[];
  public imageInfos?: Observable<any>;
  public pStartDate: any;
  public pEndDate: any;
  isAdminReferral = false;
  isActive = false;
  hascontract = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  constructor(
    private planService: PlanService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPlanComponent>,
    private formBuilder: FormBuilder,
    public CurrencyFormat: CurrencyFormatPipe,
    public dialog: MatDialog
  ) {}

  public Plans: any;

  ngOnInit(): void {
    this.PlansItems = this.GetPlansList();
    this.PersonTypeList = [
      { code: 1, name: 'حقیقی ' },
      { code: 2, name: 'حقوقی' },
      { code: 3, name: 'همه موارد' },
    ];
    this.FileType = [
      { code: 0, name: 'jpg ' },
      { code: 1, name: 'jpeg' },
      { code: 2, name: 'pdf' },
      { code: 3, name: 'docx' },
    ];
    this.Planform = this.formBuilder.group({
      title: [null, Validators.required],
      isActive: [false],
      isAdminReferral: [false],
      hascontract: [false],
      minamount: [false, Validators.required],
      maxamount: [false, Validators.required],
      ratio: [false, Validators.required],
      registerCount: [null, Validators.required],
      countOfPerson: [null, Validators.required],
      keywords: [null, Validators.required],
      seoDesc: [null, Validators.required],
      agreement: [null, Validators.required],
      body: [null, Validators.required],
      logoData: [null],
    });
  }

  GetPlansList(): any[] {
    return [
      this.planService.GeTFacilityList().subscribe(
        (suc) => {
          this.PlansItems = suc.value;
        },
        (err) => {}
      ),
    ];
  }

  public onSubmit(): void {
    if (!this.Planform.valid) {
      this.snackBar.open('لطفا تمامی فیلدها را پر نمایید', 'بستن', {
        duration: 3000,
      });
      return;
    }
    let data;
    data = {
      ...this.Planform.value,
      planStartDate: this.pStartDate,
      planExpireDate: this.pEndDate,
    };
    this.addNewPlan(data);
  }

  addNewPlan(data: any): any[] {
    debugger;
    data.logoData = this.FileData;
    return [
      this.planService.addNewPlan(data).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.snackBar.open('با موفقیت ثبت شد.', 'بستن', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('خطا در ثبت.' + res.errors[0].message, 'بستن', {
              duration: 3000,
            });
          }
          this.Planform.reset();
          this.dialogRef.close('suc');
        },
        (err) => {
          this.snackBar.open('خطا در ثبت.' + err?.errors[0], 'بستن', {
            duration: 3000,
          });
          this.Planform.reset();
          this.dialogRef.close(err);
        }
      ),
    ];
  }

  public dataChange(
    event: any,
    dateInput: any,
    picker: any,
    controlName: string
  ) {
    var faDate = dateInput.value;
    if (!faDate || !faDate.trim().length) {
      return;
    }
    moment.locale('fa');
    var enDateMomentFormat = moment(faDate).locale('en');
    if (!enDateMomentFormat.isValid()) {
      return;
    }
    var enDate = new Date(enDateMomentFormat.toLocaleString());
    picker._validSelected = enDate;
    picker.startAt = enDate;
    if (controlName == 'fromDate') {
      this.pStartDate = new Intl.DateTimeFormat('en-US').format(enDate);
    } else {
      this.pEndDate = new Intl.DateTimeFormat('en-US').format(enDate);
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.planService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.planService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }
}
