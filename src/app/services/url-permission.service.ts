import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlPermissionService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthorized: boolean = localStorage.getItem('beauty.access.token') != null;
    /*если пользователь не авторизован и если мы переходим на главную страницу, то redirect на аутентификацию*/
    if (!isAuthorized && state.url.search('main') !== -1) {
      this.router.navigateByUrl('login');
      return false;
      /*если пользователь авторизован и если мы переходим на страницу аутентификации(вводим в адресную строку),
      то redirect на страницу с Обзором(не дает уйти)*/
    } else if (isAuthorized && state.url.search('login') !== -1) {
      this.router.navigateByUrl('main');
      return false;
    }
    return true;
  }
}
