import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {RequestInterceptorService} from './services/request-interceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackBarService} from './services/snack-bar.service';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MaterialIconsService} from './services/material-icons.service';
import {MatSelectModule} from '@angular/material/select';
import { ClientPageComponent } from './pages/main-page/components/client-page/client-page.component';
import { ShopPageComponent } from './pages/main-page/components/shop-page/shop-page.component';
import { AdminPageComponent } from './pages/main-page/components/admin-page/admin-page.component';
import {BeautyService} from './services/beauty.service';
import {MatTableModule} from '@angular/material/table';
import { UpdateBeautyDialogComponent } from './pages/main-page/components/shop-page/update-beauty-dialog/update-beauty-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {ClientService} from './services/client.service';
import {MatTabsModule} from '@angular/material/tabs';
import {ShopService} from './services/shop.service';
import {UrlPermissionService} from './services/url-permission.service';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {getRusPaginatorIntl} from './utils/rus-paginator-intl.util';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    ClientPageComponent,
    ShopPageComponent,
    AdminPageComponent,
    UpdateBeautyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    { provide: MatPaginatorIntl,
      useValue: getRusPaginatorIntl()
    },
    SnackBarService,
    MaterialIconsService,
    BeautyService,
    ClientService,
    ShopService,
    UrlPermissionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateBeautyDialogComponent
  ]
})
export class AppModule {
}
