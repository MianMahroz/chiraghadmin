import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellerDetailsComponent } from './admin-seller-details.component';

describe('AdminSellerDetailsComponent', () => {
  let component: AdminSellerDetailsComponent;
  let fixture: ComponentFixture<AdminSellerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSellerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSellerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
