import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsignoutComponent } from './adminsignout.component';

describe('AdminsignoutComponent', () => {
  let component: AdminsignoutComponent;
  let fixture: ComponentFixture<AdminsignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsignoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
