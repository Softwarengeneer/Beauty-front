import {Component, OnInit} from '@angular/core';
import {BeautyChangeRequestPayload, BeautyForAdmin, BeautyForShop} from '../../../../models/beauty.model';
import {BeautyService} from '../../../../services/beauty.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateBeautyDialogComponent} from './update-beauty-dialog/update-beauty-dialog.component';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  public beauty: BeautyForShop[] = [];
  public displayedColumns: string[] = ['productName', 'productPrice', 'creationDate', 'status', 'isPaid', 'isOrderCompleted', 'confirmPayment',
    'client', 'shopPayment', 'update'];

  constructor(private beautyService: BeautyService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBeauty();
  }

  updateBeauty(beauty: BeautyForShop): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '450px';
    dialogConfig.width = '450px';
    dialogConfig.data = beauty;
    // tslint:disable-next-line:max-line-length
    this.dialog.open(UpdateBeautyDialogComponent, dialogConfig).componentInstance.beautyUpdate.subscribe((updatedBeauty: BeautyChangeRequestPayload) => {
      this.beautyService.updateBeauty(updatedBeauty).subscribe(() => {
        this.getBeauty();
      }, error => {
        console.log(error);
      });
    });
  }

  getBeauty(): void {
    this.beautyService.getBeauty('shops').subscribe((beauty: BeautyForShop[]) => {
      this.beauty = beauty.filter((beautyForShop: BeautyForShop) => {
        return beautyForShop.clientFirstName.length !== 0;
      });
    });
  }
}
