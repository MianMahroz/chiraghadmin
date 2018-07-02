import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationHomeComponent } from './verification-home.component';

describe('VerificationHomeComponent', () => {
  let component: VerificationHomeComponent;
  let fixture: ComponentFixture<VerificationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
