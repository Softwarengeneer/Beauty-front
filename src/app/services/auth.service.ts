import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthResponseMessage, Role, Client} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Shop} from '../models/shop.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public getUserRole(): Role {
    return localStorage.getItem('beauty.user.role') as 'ROLE_SHOP' | 'ROLE_ADMIN' | 'ROLE_CLIENT';
  }

  public logIn(user: Client): Observable<any> {
    return this.http.post(`${environment.basePath}api/signin`, user);
  }

  public registerClient(client: Client): Observable<any> {
    console.log(client);
    return this.http.post(`${environment.basePath}api/client/register`, client);
  }

  public registerShop(shop: Shop): Observable<any> {
    console.log(shop);
    return this.http.post(`${environment.basePath}api/shop/register`, shop);
  }

  public logOut(): void {
    this.router.navigateByUrl('login');
    localStorage.removeItem('beauty.access.token');
  }

}

