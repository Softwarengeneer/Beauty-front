import { Injectable } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MaterialIconsService {
  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  init(): void {
    this.iconRegistry.addSvgIcon('icon_account', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icon_account.svg'));
    this.iconRegistry.addSvgIcon('icon_lock', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icon_lock.svg'));
    this.iconRegistry.addSvgIcon('icon_visibility_off', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icon_visibility_off.svg'));
    this.iconRegistry.addSvgIcon('icon_visibility', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icon_visibility.svg'));
    this.iconRegistry.addSvgIcon('icon_visibility_black', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icon_visibility_black.svg'));
  }
}
