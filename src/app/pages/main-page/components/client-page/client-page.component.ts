import { Component, OnInit } from '@angular/core';
import {BeautyForClient, BeautyForShop} from '../../../../models/beauty.model';
import {BeautyService} from '../../../../services/beauty.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  public beauty: BeautyForClient[] = [];
  public displayedColumns: string[] = ['productName', 'productPrice', 'shopName', 'creationDate', 'status', 'beautySum'];
  constructor(private beautyService: BeautyService) { }

  ngOnInit(): void {
    this.beautyService.getBeauty('clients').subscribe((beauty: BeautyForClient[]) => {
      this.beauty = beauty.filter((beautyForClient: BeautyForClient) => {
        return beautyForClient.shopName.length !== 0;
      });
    });
  }

}
