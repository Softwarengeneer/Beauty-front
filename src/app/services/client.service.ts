import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  public getClientBalance(): Observable<any> {
    const userId = localStorage.getItem('beauty.user.id');
    return this.http.get(`${environment.basePath}api/clients/${userId}/balance`);
  }

  public getClients(): Observable<any> {
    return this.http.get(`${environment.basePath}api/clients`);
  }

}

