import { Component } from '@angular/core';
import {MaterialIconsService} from './services/material-icons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Сервис Красоты';

  constructor(private materialIconsService: MaterialIconsService) {
    materialIconsService.init();
  }
}
