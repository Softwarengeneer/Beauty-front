import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {BeautyChangeRequestPayload} from '../models/beauty.model';

@Injectable({
  providedIn: 'root'
})
export class BeautyService {

  public statusMap: Map<string, string> = new Map();

  constructor(private http: HttpClient) {
    this.initStatusMap();
  }

  public getBeauty(userRole: string): Observable<any> {
    const userId = localStorage.getItem('beauty.user.id');
    return this.http.get(`${environment.basePath}api/${userRole}/${userId}/beauty`);
  }

  public updateBeauty(beautyChangeRequestPayload: BeautyChangeRequestPayload): Observable<any> {
    return this.http.put(`${environment.basePath}api/beauty/${beautyChangeRequestPayload.beautyId}`, beautyChangeRequestPayload);
  }

  public processBeauty(): Observable<any> {
    return this.http.post(`${environment.basePath}api/admin/beauty/process`, {});
  }

  public gelAllBeauty(): Observable<any> {
    return this.http.get(`${environment.basePath}api/admin/beauty`);
  }

  private initStatusMap(): void {
    this.statusMap.set('NEW', 'Создан');
    this.statusMap.set('RECEIVED_INF', 'Получена информация от магазина');
    this.statusMap.set('APPROVED', 'Выплачен');
    this.statusMap.set('REJECTED', 'Отклонен');
    this.statusMap.set('RECEIVED_SUM', 'Получена выплата от магазина');
  }

}

