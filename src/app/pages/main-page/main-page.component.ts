import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Role} from '../../models/user.model';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {BeautyService} from '../../services/beauty.service';
import {SnackBarService} from '../../services/snack-bar.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public selectedRole: Role = 'ROLE_CLIENT';
  public userLogin: string;
  public clientBalance: number;
  public beautyChange = false;

  constructor(private authService: AuthService, private router: Router, private clientService: ClientService,
              private beautyService: BeautyService, private  snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.selectedRole = this.authService.getUserRole();
    this.userLogin = localStorage.getItem('beauty.user.login');
    this.clientService.getClientBalance().subscribe((balance) => {
      this.clientBalance = balance;
    });
  }

  processBeauty(): void {
    this.beautyService.processBeauty().subscribe(() => {
      this.beautyChange = !this.beautyChange;
      this.snackBarService.openSnackBar('Пересчет стоимости прошел успешно!');
    });
  }

  logout(): void {
    localStorage.removeItem('beauty.access.token');
    localStorage.removeItem('beauty.user.role');
    localStorage.removeItem('beauty.user.id');
    localStorage.removeItem('beauty.user.login');
    this.router.navigateByUrl('login');
  }
}
