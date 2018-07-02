import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsellerhomeComponent } from './adminsellerhome.component';

describe('AdminsellerhomeComponent', () => {
  let component: AdminsellerhomeComponent;
  let fixture: ComponentFixture<AdminsellerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsellerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsellerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
