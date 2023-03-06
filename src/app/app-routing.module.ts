import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {UrlPermissionService} from './services/url-permission.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [UrlPermissionService]},
  {path: 'login', component: LoginPageComponent, canActivate: [UrlPermissionService]},
  {path: 'main', component: MainPageComponent, canActivate: [UrlPermissionService]},
  {path: '**', redirectTo: '/login', pathMatch: 'full', canActivate: [UrlPermissionService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
