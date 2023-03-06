import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBeautyDialogComponent } from './update-beauty-dialog.component';

describe('UpdateBeautyDialogComponent', () => {
  let component: UpdateBeautyDialogComponent;
  let fixture: ComponentFixture<UpdateBeautyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBeautyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBeautyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
