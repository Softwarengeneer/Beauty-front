import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ClientService} from '../../../../services/client.service';
import {ShopService} from '../../../../services/shop.service';
import {Client} from '../../../../models/user.model';
import {Shop} from '../../../../models/shop.model';
import {BeautyService} from '../../../../services/beauty.service';
import {BeautyForAdmin} from '../../../../models/beauty.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnChanges {

  public clients: Client[] = [];
  public shops: Shop[] = [];
  public clientsTableColumnName = ['id', 'login', 'firstName', 'lastName', 'balance'];
  public beautyTableColumnName = ['id', 'shopName', 'productName', 'productPrice', 'creationDate', 'status', 'isPaid', 'isOrderCompleted', 'confirmPayment',
    'client', 'beautySum', 'shopPayment'];
  @Input() beautyChange;

  public beautyDataSource: MatTableDataSource<BeautyForAdmin>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService, private shopService: ShopService, public beautyService: BeautyService) {
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
    this.shopService.getShops().subscribe((shops: Shop[]) => {
      this.shops = shops;
    });
    this.beautyService.gelAllBeauty().subscribe((beauty: BeautyForAdmin[]) => {
      this.beautyDataSource = new MatTableDataSource<BeautyForAdmin>(beauty);
      this.beautyDataSource.paginator = this.paginator;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.beautyService.gelAllBeauty().subscribe((beauty: BeautyForAdmin[]) => {
      this.beautyDataSource = new MatTableDataSource<BeautyForAdmin>(beauty);
      this.beautyDataSource.paginator = this.paginator;
    });
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

}
