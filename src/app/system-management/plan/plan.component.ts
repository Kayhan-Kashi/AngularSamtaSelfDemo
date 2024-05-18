import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  public planList: any[] = [];
  public planListTableColumns: TableColumn[];

  constructor() { }

  ngOnInit(): void {
  }

}
