import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BeautyChangeRequestPayload, BeautyForShop} from '../../../../../models/beauty.model';
import {MyErrorStateMatcher} from '../../../../login-page/login-page.component';

@Component({
  selector: 'app-update-beauty-dialog',
  templateUrl: './update-beauty-dialog.component.html',
  styleUrls: ['./update-beauty-dialog.component.scss']
})
export class UpdateBeautyDialogComponent implements OnInit {

  @Output() beautyUpdate = new EventEmitter<BeautyChangeRequestPayload>();
  beautyForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor( private dialogRef: MatDialogRef<UpdateBeautyDialogComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public beauty: BeautyForShop) {
  }


  ngOnInit(): void {
    this.beautyForm = this.formBuilder.group({
    productName: [this.beauty.productName],
    isPaid: [this.beauty.isPaid],
    isOrderCompleted: [this.beauty.isOrderCompleted],
    payment: [this.beauty.shopPayment, {validators: [Validators.required,
          Validators.pattern('^[0-9]*[.,]?[0-9]+$')] }],
    });
    // Validators.min(this.beauty.beautySum / 0.9)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onBeautyUpdate(): void {
    this.closeDialog();
    this.beautyUpdate.emit({
      beautyId: this.beauty.id,
      isPaid: this.beautyForm.get('isPaid').value,
      isOrderCompleted: this.beautyForm.get('isOrderCompleted').value,
      payment: this.beautyForm.get('payment').value
    });
  }

}
