import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationParam } from '../_entities/PaginationParam';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private httpClient: HttpClient) {}

  public GetPlanListByPagination(data: PaginationParam): Observable<any> {
    let plans = this.httpClient.post<any>(
      environment.apiUrl + '/api/plan/GetAllPagination',
      data
    );
    return plans;
  }

  addNewPlan(data: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + '/api/plan/create',
      data
    );
  }

  DeletePlan(data: number): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = null;

    return this.httpClient.post<any>(
      environment.apiUrl + '/api/Plan/Delete?id=' + data,
      body,
      { headers: headers }
    );
  }

  public GeTFacilityList(): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + '/api/Facility/GetAll',
      null
    );
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}files`);
  }
}
