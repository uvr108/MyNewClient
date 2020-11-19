import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteContableComponent } from './comprobante-contable.component';

describe('ComprobanteContableComponent', () => {
  let component: ComprobanteContableComponent;
  let fixture: ComponentFixture<ComprobanteContableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteContableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
