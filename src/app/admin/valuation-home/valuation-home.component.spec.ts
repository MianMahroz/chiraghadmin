import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationHomeComponent } from './valuation-home.component';

describe('ValuationHomeComponent', () => {
  let component: ValuationHomeComponent;
  let fixture: ComponentFixture<ValuationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
